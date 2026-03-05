import React from "react"

interface Props {
	children?: React.ReactNode	
	theme?: string
	flexDirection?: "flex-row" | "flex-col"
	className?: string
}

export const Container = ({children, className, theme="default", flexDirection="flex-col"}: Props) => {
	const themes = {
		default: "",
		bordered: "border border-gray-200 rounded-md shadow-md"
	}
	return (
		<div className = {`flex ${flexDirection === "flex-col" ? "flex-col gap-y-4" : "flex-row gap-x-4"} lg:p-4 p-2 ${themes[theme as keyof typeof themes]} ${className ?? ""}`}>
			{children}
		</div>
	)	
}