import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import download from "../assets/download.svg"
import spinner from "../assets/spinner.svg"
import { api } from "../services/api"
import { useLinkStore } from "../stores/link-store"
import { LinkComponent } from "./link-component"
import { LoadingLinksComponent } from "./loading-links-component"
import { NoLinkComponent } from "./no-link-component"
import { TopLoadingBarComponent } from "./top-loading-bar-component"
import { ButtonUi } from "./ui/button-ui"

export function MyLinksComponent() {
	const [isLoading, setIsLoading] = useState({ listSort: true, exportLinks: false })
	const { links, setLinks } = useLinkStore()

	async function handleExportLinks() {
		setIsLoading(prev => ({ ...prev, exportLinks: true }))

		if (import.meta.env.VITE_FAKE_EXPORT_SVG === "false") {
			await api
				.post("/links/csv")
				.then(response => {
					window.open(response.data.reportUrl, "_self")
					toast.success("Exportação executado com sucesso!")
				})
				.catch(() => {
					toast.error("Falha ao exportar os dados!")
				})
		} else {
			toast.success(
				"Não será gerado um arquivo CSV, para poupar recursos do Cloudflare, obrigado",
				{ duration: 10000 },
			)
		}

		setIsLoading(prev => ({ ...prev, exportLinks: false }))
	}

	useEffect(() => {
		api
			.get("/links")
			.then(({ data }) => {
				setLinks(data.links)
			})
			.catch(() => {
				toast.error("Falha ao listar os links!")
			})
			.finally(() => {
				setIsLoading(prev => ({ ...prev, listSort: false }))
			})
	}, [setLinks])

	return (
		<section className="relative flex-1 self-start w-full p-8 bg-gray-100 rounded-lg overflow-hidden md:max-w-[580px]">
			{isLoading.listSort && <TopLoadingBarComponent />}

			<div className="flex justify-between items-center mb-4">
				<h1 className="text-gray-600 font-bold text-lg leading-6">Meus links</h1>

				<ButtonUi
					type="button"
					size="rectangular"
					onClick={handleExportLinks}
					disabled={links?.length === 0 || isLoading.listSort || isLoading.exportLinks}
				>
					{isLoading.exportLinks ? (
						<img src={spinner} alt="O" className="size-3" />
					) : (
						<img src={download} alt="download" className="size-3" />
					)}
					Baixar CSV
				</ButtonUi>
			</div>

			<div className="max-h-[35lvh] md:max-h-[65lvh] overflow-y-auto">
				{isLoading.listSort ? (
					<LoadingLinksComponent />
				) : links?.length === 0 ? (
					<NoLinkComponent />
				) : (
					links.map(link => <LinkComponent key={link.id} link={link} />)
				)}
			</div>
		</section>
	)
}
