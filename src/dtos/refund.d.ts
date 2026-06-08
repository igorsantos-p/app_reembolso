import type { CategoryAPIEnum } from "./categories"

type RefundAPIResponse = {
    userId: string
    id: string
    name: string
    category: CategoryAPIEnum
    amount : number
    filename: string
    user : {
        name: string
    }
}

type RefundsPaginationAPIResponse = {
    refunds: RefundAPIResponse[],
    pagination: {
        page: number
        perPage: number,
        totalRecords: number
        totalPages: number
    }
}