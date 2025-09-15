import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { createLink } from "../../../app/function/create-link.ts"
import { isRight, unwrapEither } from "../../shared/either.ts"

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
	server.post(
		"/links",
		{
			schema: {
				summary: "Create a short link",
				description: "Create a new short link for an existing URL",
				tags: ["Links"],
				body: z.object({
					originalLink: z.url().describe("The original URL to shorten"),
					shortLink: z
						.string()
						.trim()
						.regex(/^[A-Za-z0-9]{1,15}$/, {
							message: "Invalid suffix: only 1-15 alphanumeric characters",
						})
						.describe("Short link suffix (without 'brev.ly/')"),
				}),
				response: {
					201: z
						.object({
							link: z.object({
								id: z.string(),
								originalLink: z.string(),
								shortLink: z.string(), // sufixo salvo no DB
								shortUrl: z.string(), // URL completa retornada pela API
								accessCount: z.number(),
								createdAt: z.date(),
							}),
						})
						.describe("Created"),
					409: z
						.object({
							statusCode: z.number(),
							name: z.string(),
							message: z.string(),
							field: z.string(),
							value: z.string(),
						})
						.describe("Value already exists"),
					422: z
						.object({
							statusCode: z.number(),
							name: z.string(),
							message: z.string(),
							field: z.string(),
							value: z.string(),
						})
						.describe("Validation failed"),
					500: z.object({ message: z.string() }).describe("Internal server error"),
				},
			},
		},
		async (request, reply) => {
			const { originalLink, shortLink } = request.body

			const result = await createLink({
				originalLink,
				shortLink,
			})

			if (isRight(result)) {
				const { link } = unwrapEither(result)
				const responseLink = {
					...link,
					shortUrl: `brev.ly/${link.shortLink}`,
				}
				return reply.status(201).send({ link: responseLink })
			}

			const { statusCode, name, message, field, value } = unwrapEither(result)

			switch (name) {
				case "AlreadyExistsError":
					return reply.status(409).send({ statusCode, name, message, field, value })
				case "InvalidShortLinkError":
					return reply.status(422).send({ statusCode, name, message, field, value })
				default:
					throw new Error()
			}
		},
	)
}
