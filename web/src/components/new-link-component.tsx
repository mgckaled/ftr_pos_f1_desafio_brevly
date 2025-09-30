import { zodResolver } from "@hookform/resolvers/zod"
import { type FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { api } from "../services/api"
import { useLinkStore } from "../stores/link-store"
import { TopLoadingBarComponent } from "./top-loading-bar-component"
import { InputUi } from "./ui/input-ui"

export function NewLinkComponent() {
	const { addLink } = useLinkStore()

	const zodSchema = z.object({
		originalLink: z.url({ message: "A URL deve ser válida" }),
		shortLink: z
			.string({ message: "Deve ser um texto" })
			.trim()
			.min(5, { message: "Deve conter pelo menos 5 caracteres" })
			.max(15, { message: "Pode conter no máximo 15 caracteres" }),
	})

	const {
		register,
		handleSubmit,
		watch,
		reset,
		setError,
		formState: { errors, isSubmitting, isLoading },
	} = useForm({
		resolver: zodResolver(zodSchema),
		defaultValues: { originalLink: "", shortLink: "" },
	})

	const isHandleEditUserData =
		!watch("originalLink") || !watch("shortLink") || Object.values(errors).length > 0

	async function handleNewLink(data: FieldValues): Promise<void> {
		await api
			.post("/links", data)
			.then(response => {
				reset()
				addLink(response.data.link)
				toast.success("Link criado com sucesso!")
			})
			.catch(
				({
					response: {
						data: { field, message },
					},
				}) => {
					if (field && message) setError(field, { message })
					toast.error("Falha ao criar o link!")
				},
			)
	}

	return (
		<section className="relative flex flex-1 flex-col self-start w-full p-8 gap-6 bg-gray-100 rounded-lg overflow-hidden md:max-w-[380px]">
			{(isSubmitting || isLoading) && <TopLoadingBarComponent />}

			<h1 className="text-gray-600 font-bold text-lg leading-6">Novo link</h1>

			<form onSubmit={handleSubmit(handleNewLink)} className="flex flex-col gap-4">
				<InputUi
					labelName="LINK ORIGINAL"
					placeholder="www.exemplo.com.br"
					isError={!!errors.originalLink}
					messageError={errors.originalLink?.message}
					{...register("originalLink")}
				/>

				<InputUi
					labelName="PALAVRA CHAVE"
					placeholder="exemplo"
					isError={!!errors.shortLink}
					messageError={errors.shortLink?.message}
					{...register("shortLink")}
				/>

				<button
					type="submit"
					disabled={isHandleEditUserData || isSubmitting || isLoading}
					className="mt-2 p-4 bg-blue-base rounded-lg text-white font-semibold text-sm leading-4 outline-none focus:underline disabled:opacity-50 enabled:cursor-pointer enabled:hover:bg-blue-dark"
				>
					{isSubmitting ? "Salvando..." : "Salvar link"}
				</button>
			</form>
		</section>
	)
}
