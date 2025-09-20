import { ExportLinkReponseOutput } from "@/types/link-response-output.ts"
import { stringify } from "csv-stringify"
import { PassThrough, Transform } from "node:stream"
import { pipeline } from "node:stream/promises"
import { db, pg } from "../../infra/db/index.ts"
import { schema } from "../../infra/db/schemas/index.ts"
import { type Either, makeRight } from "../../infra/shared/either.ts"
import { uploadFileToStorage } from "../../infra/storage/upload-file-to-storage.ts"

export async function exportLinks(): Promise<Either<never, ExportLinkReponseOutput>> {
	const { sql, params } = db
		.select({
			originalLink: schema.links.originalLink,
			shortLink: schema.links.shortLink,
			accessCount: schema.links.accessCount,
			createdAt: schema.links.createdAt,
		})
		.from(schema.links)
		.toSQL()

	const cursor = pg.unsafe(sql, params as string[]).cursor(20)

	const csv = stringify({
		delimiter: ";",
		header: true,
		columns: [
			{ key: "original_link", header: "Original Link" },
			{ key: "short_link", header: "Short Link" },
			{ key: "accessCount", header: "AccessCount" },
			{ key: "created_at", header: "Created At" },
		],
	})

	const uploadToStorageStream = new PassThrough()

	const convertToCSVPipeline = pipeline(
		cursor,
		new Transform({
			objectMode: true,
			transform(chunks: unknown[], _encoding, callback) {
				for (const chunk of chunks) {
					this.push(chunk)
				}

				callback()
			},
		}),
		csv,
		uploadToStorageStream,
	)

	const uploadToStorage = uploadFileToStorage({
		contentType: "text/csv",
		folder: "links",
		fileName: "links",
		contentStream: uploadToStorageStream,
	})

	const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

	return makeRight({ reportUrl: url })
}
