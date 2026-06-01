import { useNavigate, useParams } from "react-router";
import { Button } from "../components/Button";
import { ConfirmModal } from "../components/ConfirmModal";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/category";
import { useState } from "react";
import fileSvg from "../assets/file.svg"


export function Refund() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [amount, setAmount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [filename, setFilename] = useState<File | null>(null)

    const navigate = useNavigate()
    const params = useParams<{ id: string }>()

    function onSubmit(e: React.SubmitEvent) {
        e.preventDefault()

        if (params.id) {
            return navigate(-1)
        }

        setOpen(true)
        setName("")
        setCategory("")
        setAmount("")
        setFilename(null)
    }

    return (
        <form onSubmit={onSubmit} className="w-full p-10 rounded-xl shadow-indigo-glow flex flex-col gap-6 lg:min-w-lg">
            <header className="text-xl font-semibold">
                <h1> Solicitação de Reembolso</h1>
                <p className="text-xs font-extralight mt-2 mb-4">Por favor, preencha os dados abaixo para solicitar o reembolso.</p>
            </header>
            <Input required legend="Nome da solicitação" value={name} onChange={(e) => setName(e.target.value)} disabled={!!params.id} />
            <div className="flex justify-between items-center gap-4">
                <Select required legend="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} disabled={!!params.id}>
                    {
                        CATEGORIES_KEYS.map((key) => (
                            <option className="bg-gray-950" key={key}>
                                {CATEGORIES[key].name}
                            </option>
                        ))
                    }
                </Select>
                <Input legend="Valor" required value={amount} onChange={(e) => setAmount(e.target.value)} disabled={!!params.id} />
            </div>
            {
                params.id ?
                    <a href="https://www.google.com/" target="blank" className="flex items-center text-sm justify-center gap-2 font-semibold my-6 hover:opacity-60 transition ease-linear">
                        <img src={fileSvg} alt="Ícone de arquivo" className="w-8" /> Abrir Comprovante
                    </a>
                    : <Upload onChange={(e) => e.target.files && setFilename(e.target.files[0])} isLoading={isLoading} filename={filename && filename.name} required />
            }
            <Button type="submit" isLoading={isLoading}>
                {params.id ? "Voltar" : "Enviar"}
            </Button>

            {open && (
                <ConfirmModal isOpen={open} onClose={() => setOpen(false)} />
            )}
        </form>
    )
}