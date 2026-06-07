import { useNavigate, useParams } from "react-router";
import { Button } from "../components/Button";
import { ConfirmModal } from "../components/ConfirmModal";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/category";
import { useState, useActionState, useRef } from "react";
import fileSvg from "../assets/file.svg"
import { z, ZodError } from "zod"
import { api } from "../services/api";
import { AxiosError } from "axios";

const refundSchema = z.object({
    name: z.string().min(3, { message: "Informe o nome da solicitação" }),
    category: z.string().min(1, { message: "Selecione uma categoria" }),
    amount: z.coerce.number({ message: "informe um valor válido" }).min(1),
})


export function Refund() {
    const [open, setOpen] = useState(false)
    const [state, formAction, isLoading] = useActionState(registration, null)
    const [file, setFile] = useState<File | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()
    const params = useParams<{ id: string }>()

    async function registration(_: any, formData: FormData) {
        if (params.id) {
            return navigate(-1)
        }

        const name = formData.get("name")
        const category = formData.get("category")
        const amount = formData.get("amount")

        try {

            if (!file) {
                return { message: "Selecione um arquivo" }
            }

            const fileUploadForm = new FormData()
            fileUploadForm.append("file", file)

            const response = await api.post("/uploads", fileUploadForm)

            const data = refundSchema.parse({
                name,
                category,
                amount: amount.toString().replace(",", "."),
            })

            const refund = await api.post("/refunds", { ...data, filename: response.data.filename })

            setOpen(true)
            formRef.current?.reset()
            setFile(null)

        } catch (error) {
            if (error instanceof ZodError) {
                return { message: error.issues[0].message }
            }

            if (error instanceof AxiosError) {
                return { message: error.response?.data.message }
            }
        }

    }

    return (
        <form action={formAction} className="w-full p-10 rounded-xl shadow-indigo-glow flex flex-col gap-6 lg:min-w-lg">
            <header className="text-xl font-semibold">
                <h1> Solicitação de Reembolso</h1>
                <p className="text-xs font-extralight mt-2 mb-4">Por favor, preencha os dados abaixo para solicitar o reembolso.</p>
            </header>
            <Input required legend="Nome da solicitação" name="name" />
            <div className="flex justify-between items-center gap-4">
                <Select required legend="Categoria" disabled={!!params.id} name="category">
                    {
                        CATEGORIES_KEYS.map((category) => (
                            <option className="bg-gray-950" key={category} value={category}>
                                {CATEGORIES[category].name}
                            </option>
                        ))
                    }
                </Select>
                <Input legend="Valor" required name="amount" />
            </div>
            {
                params.id ?
                    <a href="https://www.google.com/" target="blank" className="flex items-center text-sm justify-center gap-2 font-semibold my-6 hover:opacity-60 transition ease-linear">
                        <img src={fileSvg} alt="Ícone de arquivo" className="w-8" /> Abrir Comprovante
                    </a>
                    : <Upload onChange={(e) => e.target.files && setFile(e.target.files[0])} isLoading={isLoading} filename={file && file.name} name="file" />
            }
            <p>{state?.message}</p>
            <Button type="submit" isLoading={isLoading}>
                {params.id ? "Voltar" : "Enviar"}
            </Button>

            {open && (
                <ConfirmModal isOpen={open} onClose={() => setOpen(false)} />
            )}
        </form>
    )
}