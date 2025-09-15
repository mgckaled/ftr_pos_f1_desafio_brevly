export type ReponseOutput = {
	link: {
		id: string
		originalLink: string
		shortLink: string
		accessCount: number
		createdAt: Date
	}
}

export type ListReponseOutput = {
	links: {
		id: string
		originalLink: string
		shortLink: string
		accessCount: number
		createdAt: Date
	}[]
}
