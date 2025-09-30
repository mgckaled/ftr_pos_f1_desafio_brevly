import { motion } from "motion/react"

export function LoadingLinksComponent() {
	return (
		<div className="flex flex-col justify-center items-center border-t border-gray-200">
			<div className="flex mt-8 space-x-2">
				{[0, 1, 2, 3].map(i => (
					<motion.div
						key={i}
						className="size-2 bg-gray-400 rounded-full"
						animate={{
							y: [0, -6, 0],
						}}
						transition={{
							repeat: Number.POSITIVE_INFINITY,
							duration: 0.6,
							delay: i * 0.1,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>

			<p className="mt-3 text-gray-500 text-[10px] leading-3.5 uppercase">CARREGANDO LINKS</p>
		</div>
	)
}
