import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { listLink } from "../../../app/function/list-link.ts"
import { isRight, unwrapEither } from "../../shared/either.ts"

export const listLinkRoute: FastifyPluginAsyncZod = async server => {
	server.get(
		"/links",
		{
			schema: {
				summary: "List short links",
				description: "Retrieve a list of all short links",
				tags: ["Links"],
				response: {
					200: z
						.object({
							links: z.array(
								z.object({
									id: z.string(),
									originalLink: z.string(),
									shortLink: z.string(),
									accessCount: z.number(),
									createdAt: z.date(),
								}),
							),
						})
						.describe("Successful response with a list of links"),
					500: z.object({ message: z.string() }).describe("Internal server error"),
				},
			},
		},
		async (_request, reply) => {
			const result = await listLink()

			if (isRight(result)) {
				const { links } = unwrapEither(result)
				return reply.status(200).send({ links })
			}

			throw new Error()
		},
	)
}
