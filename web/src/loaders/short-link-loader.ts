import type { LoaderFunctionArgs } from "react-router-dom"
import { api } from "../services/api"

type Params = {
	shortLink: string
}

export type ShortLinkLoaderOutput = {
	accesses: number
	originalLink: string
}

export async function shortLinkLoader({
	params,
}: LoaderFunctionArgs): Promise<ShortLinkLoaderOutput> {
	const { shortLink } = params as Params

	const { data } = await api.get(`/links/${shortLink}`)

	if (!data) throw new Error("Short link not found")

	return data
}
