import { Input } from "../components/Input";
import { Select } from "../components/Select";

export function Refund() {
    return (
        <form action="" className="w-full p-10 rounded-xl shadow-indigo-glow flex flex-col gap-6 lg:min-w-lg">
            <header className="text-xl font-semibold">
                <h1> Solicitação de Reembolso</h1>
                <p className="text-xs font-extralight mt-2 mb-4">Por favor, preencha os dados abaixo para solicitar o reembolso.</p>
            </header>
            <Input required legend="Nome da solicitação" />
            <Select required legend="Categoria" />
        </form>
    )
}