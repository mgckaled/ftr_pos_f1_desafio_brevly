import { createBrowserRouter } from "react-router-dom"
import { shortLinkLoader } from "./loaders/short-link-loader"
import { AppPage } from "./pages/app-page"
import { NotFoundPage } from "./pages/not-found-page"
import { ShortLinkPage } from "./pages/short-link-page"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <AppPage />,
	},
	{
		path: "/:shortLink",
		element: <ShortLinkPage />,
		loader: shortLinkLoader,
		errorElement: <NotFoundPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
])
