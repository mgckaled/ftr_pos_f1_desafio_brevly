import { eq } from "drizzle-orm"
import { z } from "zod"
import { db } from "../../infra/db/index.ts"
import { schema } from "../../infra/db/schemas/index.ts"
import { type Either, makeLeft, makeRight } from "../../infra/shared/either.ts"
import type { ReponseOutput } from "../../types/link-response-output.ts"
import { NotFoundLinkError } from "./errors/not-found-link-error.ts"

const zodSchema = z.object({
	shortLink: z.string().trim().min(1).max(15),
})

type Input = z.input<typeof zodSchema>

export async function findShortLink(
	input: Input,
): Promise<Either<NotFoundLinkError, Pick<ReponseOutput["link"], "originalLink" | "accessCount">>> {
	const { shortLink } = zodSchema.parse(input)

	const link = await db.query.links.findFirst({
		where: (links, { eq }) => eq(links.shortLink, shortLink),
	})

	if (!link) return makeLeft(new NotFoundLinkError("shortLink", shortLink))

	const [newLink] = await db
		.update(schema.links)
		.set({ accessCount: link.accessCount + 1 })
		.where(eq(schema.links.id, link.id))
		.returning()

	return makeRight({
		originalLink: newLink.originalLink,
		accessCount: newLink.accessCount,
	})
}
