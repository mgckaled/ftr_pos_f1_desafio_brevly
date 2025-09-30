import { Link } from "react-router-dom"
import error404 from "../assets/404.svg"

export function NotFoundPage() {
	return (
		<main className="flex h-screen items-center justify-center">
			<div className="flex flex-col justify-center items-center max-w-[580px] m-5 px-5 py-16 gap-6 rounded-lg bg-gray-100">
				<img src={error404} alt="404" className="w-44" />

				<h2 className="text-gray-600 font-bold text-2xl leading-8">Link não encontrado</h2>

				<p className="text-center text-gray-500 font-semibold text-sm leading-5">
					O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
					Saiba mais em{" "}
					<Link to="/" className="text-blue-base underline">
						brev.ly
					</Link>
					.
				</p>
			</div>
		</main>
	)
}
