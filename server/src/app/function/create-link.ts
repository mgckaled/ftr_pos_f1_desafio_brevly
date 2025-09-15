import { z } from "zod"
import { db } from "../../infra/db/index.ts"
import { schema } from "../../infra/db/schemas/index.ts"
import { type Either, makeLeft, makeRight } from "../../infra/shared/either.ts"
import type { ReponseOutput } from "../../types/link-response-output.ts"
import { AlreadyExistsError } from "./errors/already-exists-error.ts"

const zodSchema = z.object({
	originalLink: z.url(),
	shortLink: z
		.string()
		.trim()
		.regex(/^[A-Za-z0-9]{1,15}$/, {
			message: "shortLink must contain only alphanumeric characters (1-15)",
		}),
})

type Input = z.input<typeof zodSchema>

export async function createLink(input: Input): Promise<Either<AlreadyExistsError, ReponseOutput>> {
	const { originalLink, shortLink } = zodSchema.parse(input)

	const shortLinkAlreadyExists = await db.query.links.findFirst({
		where: (links, { eq }) => eq(links.shortLink, shortLink),
	})

	if (shortLinkAlreadyExists) {
		return makeLeft(new AlreadyExistsError("shortLink", shortLink))
	}

	const [result] = await db.insert(schema.links).values({ originalLink, shortLink }).returning()

	const linkWithFull = {
		...result,
		shortUrl: `brev.ly/${result.shortLink}`,
	}

	return makeRight({ link: linkWithFull })
}
