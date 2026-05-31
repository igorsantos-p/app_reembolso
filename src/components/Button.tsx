import { classMerge } from "../utils/classMerge"

type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean
    variant?: "base" | "icon"
}

const variants = {
    button: {
        base: "h-12 p-4",
        icon: "h-12 w-12"
    }
}

export function Button({ children, className, isLoading, type = "button", variant = "base", ...rest }: Props) {
    return (
        <button type={type} {...rest} disabled={isLoading} className={
            classMerge(["uppercase rounded-lg flex items-center justify-center bg-indigo-900 cursor-pointer hover:bg-indigo-700 transition ease-linear disabled:opacity-50 disabled:cursor-progress disabled:hover:bg-indigo-900", variants.button[variant], className])
        }>{children}</button>
    )
}