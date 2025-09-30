import type { InputHTMLAttributes } from "react"
import error from "../../assets/error.svg"

type Props = InputHTMLAttributes<HTMLInputElement> & {
	labelName: string
	isError: boolean
	messageError: string | undefined
}

export function InputUi({ labelName, isError, messageError, ...rest }: Props) {
	return (
		<fieldset className="group flex flex-col gap-2">
			<label
				htmlFor={rest.id}
				className={`group-focus-within:text-blue-base text-[10px] leading-3.5 ${
					isError ? "text-danger font-semibold" : "text-gray-500 font-normal"
				}`}
			>
				{labelName}
			</label>

			<input
				type="text"
				className={`group-focus-within:text-blue-base h-12 p-3 rounded-lg border-2 text-sm font-semibold placeholder-gray-400 outline-blue-base ${
					isError ? "text-danger border-danger" : "border-gray-400 text-gray-600"
				}`}
				{...rest}
			/>

			{isError && (
				<strong className="flex items-center gap-2 text-danger font-semibold text-xs leading-4">
					<img src={error} alt="error" className="h-3.5" />
					{messageError}
				</strong>
			)}
		</fieldset>
	)
}
