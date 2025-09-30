import link from "../assets/link.svg"

export function NoLinkComponent() {
	return (
		<div className="flex flex-col justify-center items-center border-t border-gray-200">
			<img src={link} alt="link" className="w-7 mt-8" />

			<p className="mt-3 text-gray-500 text-[10px] leading-3.5 uppercase">
				AINDA NÃO EXISTE LINKS CADASTRADOS
			</p>
		</div>
	)
}
