import type { ISwaggerBodySchema } from "@/types/swagger-schema.ts"
import { jsonSchemaTransform } from "fastify-type-provider-zod"

type TransformSwaggerSchemaData = Parameters<typeof jsonSchemaTransform>[0]

export function transformSwaggerSchema(data: TransformSwaggerSchemaData) {
	const { schema, url } = jsonSchemaTransform(data)

	if (schema.consumes?.includes("multipart/form-data")) {
		if (!schema.body) {
			schema.body = {
				type: "object",
				required: [],
				properties: {},
			}
		}

		const schemaBody = schema.body as ISwaggerBodySchema

		schemaBody.properties.file = {
			type: "string",
			format: "binary",
		}

		schemaBody.required.push("file")
	}

	return { schema, url }
}
