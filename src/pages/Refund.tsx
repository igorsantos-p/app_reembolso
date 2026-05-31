import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/category";
import { use, useState } from "react";

export function Refund() {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [amount, setAmount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [filename, setFilename] = useState<File | null>(null)

    function onSubmit(e: React.SubmitEvent) {
        e.preventDefault()
    }

    return (
        <form onSubmit={onSubmit} className="w-full p-10 rounded-xl shadow-indigo-glow flex flex-col gap-6 lg:min-w-lg">
            <header className="text-xl font-semibold">
                <h1> Solicitação de Reembolso</h1>
                <p className="text-xs font-extralight mt-2 mb-4">Por favor, preencha os dados abaixo para solicitar o reembolso.</p>
            </header>
            <Input required legend="Nome da solicitação" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="flex justify-between items-center gap-4">
                <Select required legend="Categoria" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {
                        CATEGORIES_KEYS.map((key) => (
                            <option className="bg-gray-950" key={key}>
                                {CATEGORIES[key].name}
                            </option>
                        ))
                    }
                </Select>
                <Input legend="Valor" required value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <Upload onChange={(e) => e.target.files && setFilename(e.target.files[0])} isLoading={isLoading} filename={filename && filename.name} />
            <Button type="submit" isLoading={isLoading}>Enviar</Button>
        </form>
    )
}