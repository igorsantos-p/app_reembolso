export function Loading() {
    return (
        <div className="w-screen h-screen flex justify-center items-center gap-4">
            <span className="text-sm font-semibold flex items-end gap-1">Carregando<span className="loading loading-dots loading-xs"></span></span>
        </div>
    )
}