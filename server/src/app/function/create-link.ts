import { z } from "zod"
import { db } from "../../infra/db/index.ts"
import { schema } from "../../infra/db/schemas/index.ts"
import { type Either, makeLeft, makeRight } from "../../infra/shared/either.ts"
import type { ReponseOutput } from "../../types/link-response-output.ts"
import { AlreadyExistsError } from "./errors/already-exists-error.ts"
import { InvalidShortLinkError } from "./errors/invalid-shortlink-error.ts"

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

export async function createLink(
	input: Input,
): Promise<Either<AlreadyExistsError | InvalidShortLinkError, ReponseOutput>> {
	const { originalLink, shortLink } = zodSchema.parse(input)

	// Validação mínima do sufixo (1–15 caracteres alfanuméricos)
	const SUFFIX_REGEX = /^[A-Za-z0-9]{1,15}$/
	if (!SUFFIX_REGEX.test(shortLink)) {
		return makeLeft(new InvalidShortLinkError("shortLink", shortLink))
	}

	const shortLinkAlreadyExists = await db.query.links.findFirst({
		where: (links, { eq }) => eq(links.shortLink, shortLink),
	})

	if (shortLinkAlreadyExists) {
		return makeLeft(new AlreadyExistsError("shortLink", shortLink))
	}

	const [result] = await db
		.insert(schema.links)
		.values({
			originalLink,
			shortLink,
		})
		.returning()

	return makeRight({ link: result })
}
