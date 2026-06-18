import { classMerge } from "../utils/classMerge"

type Props = React.ComponentProps<"div"> & {
    variant?: "base" | "icon"
}

const variants = {
    loader: {
        base: "",
        icon: ""
    }
}

export function Loading({ variant = "base", className }: Props) {
    return (
        variant === "base" ?
            (<div className={classMerge(["flex justify-center items-center gap-4", className])}>
                <span className="text-sm font-semibold flex items-end gap-1">Carregando<span className="loading loading-dots loading-xs"></span></span>
            </div>)
            :
            (<span className={classMerge(["loading loading-spinner loading-md opacity-100", className])}></span>)
    )
}