import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: string 
    children: React.ReactNode
    className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(({theme="secondary", children, className, ...props}, ref) => {
    const themes = {
        "secondary": `border-gray-300 text-gray-700 bg-white dark:hover:bg-gray-100 hover:bg-gray-50`,
        "primary": `border-blue-500 text-gray-50 bg-blue-700 hover:bg-blue-700`,
        "alert": `border-red-600 text-gray-50 bg-red-600 hover:bg-red-700`
    }
    return (
        <button 
            ref={ref}
            className = {`${themes[theme as keyof typeof themes]} inline-flex justify-center items-center px-3 py-3 border shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none transition-colors cursor-pointer whitespace-nowrap duration-200 ${className}`}
            {...props}
        >
            {children}
        </button>
    )
})
