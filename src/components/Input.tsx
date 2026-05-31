
type Props = React.ComponentProps<"input"> & {
    legend?: string
}

export function Input({ legend, type = "text", ...rest }: Props) {
    return (
        <fieldset className="flex flex-1 max-h-20 focus-within:text-indigo-300">
            {legend &&
                <legend className="uppercase text-xs mb-2">
                    {legend}
                </legend>
            }
            <input type={type} {...rest} className="w-full h-12 rounded-lg border border-indigo-200 px-4 text-sm text-indigo-50 bg-transparent outline-none focus:ring-2 focus:ring-indigo-200" />
        </fieldset>
    )
}