import { Routes, Route } from "react-router"
import { Refund } from "../pages/Refund"
import { NotFound } from "../pages/NotFound"
import { AppLayout } from "../components/AppLayout"
import { Dashboard } from "../pages/Dashboard"

export function EmployeeRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<Refund />} />
                <Route path="refunds/solicitacoes" element={<Dashboard />} />
                <Route path="refund/:id" element={<Refund />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes >
    )
}