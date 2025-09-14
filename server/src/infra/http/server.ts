import { fastifyCors } from "@fastify/cors"
import { fastifyMultipart } from "@fastify/multipart"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import fastifyApiReference from "@scalar/fastify-api-reference"
import { fastify } from "fastify"
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { transformSwaggerSchema } from "./transform-swagger-schema.ts"

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: "Validation error",
			issues: error.validation,
		})
	}
	console.error("Error =>", error)
	return reply.status(500).send({ message: "Internal server error" })
})

server.register(fastifyCors, { origin: "*" })
server.register(fastifyMultipart)

server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Brev.Ly - Link Shortener",
			version: "1.0.0",
			description: "API for shortening links",
			contact: {
				name: "Brev.Ly API Support",
				email: "suporte@example.com",
			},
			license: {
				name: "MIT",
				url: "https://opensource.org/licenses/MIT",
			},
		},
	},
	transform: transformSwaggerSchema,
})

// Classic Swagger UI (opcional)
server.register(fastifySwaggerUi, {
	routePrefix: "/docs",
})

// New UI with Scalar
server.register(fastifyApiReference as any, {
  routePrefix: "/reference",
  configuration: {
	spec: { url: "/docs/json" },
	layout: "modern",
	theme: "dark",
  },
})

// server.register(Route)

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
	console.log("HTTP server running on http://localhost:3333 🚀")
	console.log("Swagger UI running on http://localhost:3333/docs 📓")
	console.log("Scalar Reference running on http://localhost:3333/reference 📓")
  console.log("Swagger JSON running on http://localhost:3333/docs/json ⚡")
})
