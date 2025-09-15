import { eq } from "drizzle-orm"
import { uuidv7 } from "uuidv7"
import { z } from "zod"
import { db } from "../../infra/db/index.ts"
import { schema } from "../../infra/db/schemas/index.ts"
import { type Either, makeLeft, makeRight } from "../../infra/shared/either.ts"
import { NotFoundLinkError } from "./errors/not-found-link-error.ts"

const zodSchema = z.object({
	id: z.string().default(uuidv7),
})

type Input = z.input<typeof zodSchema>

export async function deleteLink(input: Input): Promise<Either<NotFoundLinkError, unknown>> {
	const { id } = zodSchema.parse(input)

	const link = await db.query.links.findFirst({
		where: (links, { eq }) => eq(links.id, id),
	})

	if (!link) return makeLeft(new NotFoundLinkError("id", id))

	await db.delete(schema.links).where(eq(schema.links.id, id))

	return makeRight({})
}
