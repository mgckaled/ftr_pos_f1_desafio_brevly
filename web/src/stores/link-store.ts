import { create } from "zustand"

export interface Link {
	id: string
	originalLink: string
	shortLink: string
	accesses: number
	createdAt: string
}

type LinkStore = {
	links: Link[]
	setLinks: (links: Link[]) => void
	addLink: (link: Link) => void
	removeLink: (id: string) => void
	incrementAccesses: (id: string) => void
}

export const useLinkStore = create<LinkStore>(set => ({
	links: [],

	setLinks: links => {
		set({ links })
	},

	addLink: link => {
		set(state => ({ links: [link, ...state.links] }))
	},

	removeLink: id => {
		set(state => ({ links: state.links.filter(link => link.id !== id) }))
	},

	incrementAccesses: id => {
		set(state => ({
			links: state.links.map(link =>
				link.id === id ? { ...link, accesses: link.accesses + 1 } : link,
			),
		}))
	},
}))
