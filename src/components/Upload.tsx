import uploadSvg from "../assets/upload.svg"

type Props = React.ComponentProps<"input"> & {
    filename?: string | null
}

export function Upload({ filename = null, ...rest }: Props) {
    return (
        <div className="uppercase text-xs mb-2">
            <legend className="mb-2">Comprovante</legend>
            <div className="w-full h-12 pl-4 flex items-center rounded-lg border border-indigo-200">
                <input type="file" id="upload" {...rest} className="hidden" />
                <span className="flex-1 text-[10px]">
                    {filename ?? "Clique para enviar o comprovante"}
                </span>
                <label htmlFor="upload" className="flex h-12 px-4 items-center rounded-r-lg bg-indigo-900 cursor-pointer -mr-px border disabled:opacity-50 hover:bg-indigo-700">
                    <img src={uploadSvg} alt="Ícone de upload" className="w-6 h-auto" />
                </label>
            </div>
        </div>
    )
}