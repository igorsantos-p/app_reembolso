type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean
}

export function Button({ children, isLoading, type = "button", ...rest }: Props) {
    return (
        <button type={type} {...rest} disabled={isLoading} className="uppercase p-4 rounded-lg flex items-center justify-center bg-indigo-900 cursor-pointer hover:bg-indigo-700 transition ease-linear disabled:opacity-50 disabled:cursor-progress disabled:hover:bg-indigo-900">{children}</button>
    )
}