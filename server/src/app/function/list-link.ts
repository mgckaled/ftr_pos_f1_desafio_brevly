import { desc } from "drizzle-orm"
import type { ListReponseOutput } from "@/types/link-response-output.ts"
import { db } from "../../infra/db/index.ts"
import { schema } from "../../infra/db/schemas/index.ts"
import { type Either, makeRight } from "../../infra/shared/either.ts"

export async function listLink(): Promise<Either<never, ListReponseOutput>> {
	const result = await db.select().from(schema.links).orderBy(desc(schema.links.createdAt))

	return makeRight({
		links: result,
	})
}
