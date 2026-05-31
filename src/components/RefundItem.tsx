
export type RefundItemProps = {
    id: string
    username: string
    category: string
    amount: string
    categoryImg: string
}

type Props = React.ComponentProps<"a"> & {
    data: RefundItemProps
}

export function RefundItem({ data, ...rest }: Props) {
    return (
        <a {...rest} className="flex items-center gap-3 hover:bg-indigo-600/10 transition ease-linear rounded-md p-2 cursor-pointer">
            <img src={data.categoryImg} alt="" className="w-6 h-6" />
            <div className="flex flex-col flex-1">
                <strong className="text-sm">{data.username}</strong>
                <span className="text-xs text-indigo-50/50">{data.category}</span>
            </div>
            <span className="text-sm font-semibold flex items-center gap-1">
                <small className="font-normal text-indigo-50/50">R$</small>
                {data.amount}
            </span>
        </a>
    )
}