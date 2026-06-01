import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState } from "react";
import searchSvg from "../assets/search.svg";
import { RefundItem } from "../components/RefundItem";
import { CATEGORIES } from "../utils/category";
import { formatCurrency } from "../utils/formatCurrency";
import { Pagination } from "../components/Pagination"

const REFUND_EXAMPLE = {
    id: "1",
    username: "Igor Pereira",
    category: "Transporte",
    amount: formatCurrency(50.76),
    categoryImg: CATEGORIES["transport"].icon
}

export function Dashboard() {
    const [name, setName] = useState("");

    function handleSearch(e: React.SubmitEvent) {
        e.preventDefault()
    }

    return (
        <div className="rounded-lg p-10 shadow-indigo-glow md:min-w-3xl">
            <h1 className="font-bold text-xl flex-1">Solicitações</h1>

            <form onSubmit={handleSearch} className="flex flex-1 items-center justify-between pb-6 md:flex-row gap-2 mt-6
            border-b border-indigo-900/60">
                <Input placeholder="Buscar solicitações" onChange={(e) => setName(e.target.value)}></Input>
                <Button variant="icon" type="submit">
                    <img src={searchSvg} alt="Ícone de busca" className="w-6 h-auto" />
                </Button>
            </form>
            <div className="mt-6 flex flex-col gap-4 max-h-96 overflow-y-scroll">
                <RefundItem data={REFUND_EXAMPLE} />
                <RefundItem data={REFUND_EXAMPLE} />
            </div>
            <Pagination current={1} total={5} />
        </div>
    )
}