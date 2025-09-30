import logo from "../assets/logo.svg"
import { MyLinksComponent } from "../components/my-links-component"
import { NewLinkComponent } from "../components/new-link-component"

export function AppPage() {
	return (
		<main className="flex flex-col items-center w-full max-w-[992px] mx-auto p-5 md:items-start md:mt-[10vh]">
			<img src={logo} alt="brev.ly" className="w-24 pb-8" />

			<div className="flex flex-col w-full gap-8 md:flex-row">
				<NewLinkComponent />
				<MyLinksComponent />
			</div>
		</main>
	)
}
