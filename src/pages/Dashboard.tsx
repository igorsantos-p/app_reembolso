import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState, useEffect } from "react";
import searchSvg from "../assets/search.svg";
import { RefundItem, type RefundItemProps } from "../components/RefundItem";
import { CATEGORIES } from "../utils/category";
import { formatCurrency } from "../utils/formatCurrency";
import { Pagination } from "../components/Pagination"
import { api, type CustomAxiosError } from "../services/api";
import type { RefundsPaginationAPIResponse } from "../dtos/refund";
import { useAlert } from "../contexts/AlertContext"

const PER_PAGE = 10

export function Dashboard() {
    const [name, setName] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(10)
    const [refunds, setRefunds] = useState<RefundItemProps[]>([])
    const { showAlert } = useAlert()

    async function handleSearch() {
        try {
            const response = await api.get<RefundsPaginationAPIResponse>(`/refunds?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`)

            setRefunds(response.data.refunds.map((refund) => ({
                id: refund.id,
                username: refund.user.name,
                description: refund.name,
                amount: formatCurrency(refund.amount),
                categoryImg: CATEGORIES[refund.category as keyof typeof CATEGORIES].icon
            })))

            setTotalPages(response.data.pagination.totalPages)

        } catch (error) {
            console.log(error)
            const err = error as CustomAxiosError
            showAlert(err.messageFriendly || "Ocorreu um erro ao buscar as solicitações.")
        }
    }

    function onSubmit(e: React.SubmitEvent) {
        e.preventDefault()
        handleSearch()
    }

    useEffect(() => {
        handleSearch()
    }, [page])

    function handlePagination(action: "next" | "previous" | "first" | "last") {
        setPage((prevPage) => {
            if (action === "next" && prevPage < totalPages) {
                return prevPage + 1
            }
            if (action === "previous" && prevPage > 1) {
                return prevPage - 1
            }
            if (action === "first" && totalPages > 1) {
                return 1
            }
            if (action === "last" && totalPages > 1) {
                return totalPages
            }

            return prevPage
        })
    }

    return (
        <div className="rounded-lg p-10 shadow-indigo-glow md:min-w-3xl">
            <h1 className="font-bold text-xl flex-1">Solicitações</h1>

            <form onSubmit={onSubmit} className="flex flex-1 items-center justify-between pb-6 md:flex-row gap-2 mt-6
            border-b border-indigo-900/60">
                <Input placeholder="Buscar solicitações" onChange={(e) => setName(e.target.value)}></Input>
                <Button variant="icon" type="submit">
                    <img src={searchSvg} alt="Ícone de busca" className="w-6 h-auto" />
                </Button>
            </form>
            <div className="mt-6 flex flex-col gap-4 max-h-96 overflow-y-scroll">
                {
                    refunds.map((item) => (
                        <RefundItem key={item.id} data={item} to={`/refund/${item.id}`} />
                    ))
                }

            </div>
            <Pagination current={page} total={totalPages} onFirst={() => handlePagination("first")} onNext={() => handlePagination("next")} onPrevious={() => handlePagination("previous")} onLast={() => handlePagination("last")} />
        </div>
    )
}