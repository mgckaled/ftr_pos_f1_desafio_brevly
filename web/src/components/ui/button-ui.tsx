import type { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	size: "square" | "rectangular"
}

export function ButtonUi({ size, children, ...rest }: Props) {
	return (
		<button
			className={`flex justify-center items-center gap-2 bg-gray-200 rounded-sm border border-gray-200 text-gray-500 font-semibold text-xs outline-blue-base enabled:cursor-pointer enabled:hover:border-blue-base disabled:opacity-50 ${
				size === "rectangular" && "h-8 px-4"
			} ${size === "square" && "size-8"}`}
			{...rest}
		>
			{children}
		</button>
	)
}
