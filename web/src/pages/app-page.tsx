import logo from "../assets/logo.svg"

export function AppPage() {
	return (
		<main className="flex flex-col items-center w-full max-w-[992px] mx-auto p-5 md:items-start md:mt-[10vh]">
			<img src={logo} alt="brev.ly" className="w-24 pb-8" />

			<div className="flex flex-col w-full gap-8 md:flex-row">
				<h1>Brev.ly</h1>
			</div>
		</main>
	)
}
