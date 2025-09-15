import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { uuidv7 } from "uuidv7"
import { z } from "zod"
import { deleteLink } from "../../../app/function/delete-link.ts"
import { isRight, unwrapEither } from "../../shared/either.ts"

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
	server.delete(
		"/links/:id",
		{
			schema: {
				summary: "Delete short link",
				description: "Delete a short link by its ID",
				tags: ["Links"],
				params: z.object({
					id: z.string().default(uuidv7).describe("The ID of the short link to delete"),
				}),
				response: {
					204: z.null().describe("Deleted"),
					404: z
						.object({
							statusCode: z.number(),
							name: z.string(),
							message: z.string(),
							field: z.string(),
							value: z.string(),
						})
						.describe("Not found"),
					500: z.object({ message: z.string() }).describe("Internal server error"),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params

			const result = await deleteLink({
				id,
			})

			if (isRight(result)) return reply.status(204).send()

			const { statusCode, name, message, field, value } = unwrapEither(result)

			switch (name) {
				case "NotFoundLinkError":
					return reply.status(404).send({ statusCode, name, message, field, value })
				default:
					throw new Error()
			}
		},
	)
}
