import { Link, useLoaderData } from "react-router-dom"
import icon from "../assets/icon.svg"
import type { ShortLinkLoaderOutput } from "../loaders/short-link-loader"

export function ShortLinkPage() {
	const { originalLink } = useLoaderData() as ShortLinkLoaderOutput

	function redirectToOriginalLink() {
		window.location.href = originalLink
	}

	setTimeout(redirectToOriginalLink, 1000)

	return (
		<main className="flex justify-center items-center h-screen">
			<div className="flex flex-col justify-center items-center max-w-[580px] m-5 px-5 py-16 gap-6 bg-gray-100 rounded-lg">
				<img src={icon} alt="icon" className="w-11" />

				<h2 className="text-gray-600 font-bold text-2xl leading-8">Redirecionando...</h2>

				<p className="text-center text-gray-500 font-semibold text-sm leading-5">
					O link será aberto automaticamente em alguns instantes. Não foi redirecionado?{" "}
					<Link to={originalLink} className="text-blue-base underline">
						Acesse aqui
					</Link>
					.
				</p>
			</div>
		</main>
	)
}
