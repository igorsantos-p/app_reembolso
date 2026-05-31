
type Props = React.ComponentProps<"select"> & {
    legend?: string
}

export function Select({ children, legend, ...rest }: Props) {
    return (
        <fieldset className="flex flex-1 max-h-20 focus-within:text-indigo-300">
            {legend &&
                <legend className="uppercase text-xs mb-2">
                    {legend}
                </legend>
            }
            <select {...rest} className="w-full h-12 rounded-lg border border-indigo-200 px-4 text-sm text-indigo-50 bg-transparent outline-none focus:ring-2 focus:ring-indigo-200" >
                <option value="" disabled selected hidden>Selecione</option>
                {children}
            </select>
        </fieldset>
    )
}