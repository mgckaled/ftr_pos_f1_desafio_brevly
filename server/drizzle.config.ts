import type { Config } from "drizzle-kit"
import { env } from "./src/env.ts"

export default {
  dbCredentials: {
    url: env.DATABASE_URL,
  },

  dialect: "postgresql",
  schema: "./src/infra/db/schemas/*",
  out: "./src/infra/db/migrations",
} satisfies Config