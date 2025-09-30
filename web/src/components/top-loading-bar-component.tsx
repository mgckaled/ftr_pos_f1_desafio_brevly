import { motion } from "motion/react"

export function TopLoadingBarComponent() {
	return (
		<div className="absolute top-0 left-0 h-0.5 w-full rounded-full overflow-hidden">
			<motion.div
				className="absolute top-0 left-0 h-full bg-blue-base"
				animate={{
					x: ["-100%", "100%"],
				}}
				transition={{
					repeat: Number.POSITIVE_INFINITY,
					duration: 1.5,
					ease: "easeInOut",
				}}
				style={{ width: "100%" }}
			/>
		</div>
	)
}
