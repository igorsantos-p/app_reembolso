import { useNavigate, useParams } from "react-router";
import { Button } from "../components/Button";
import { ConfirmModal } from "../components/ConfirmModal";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/category";
import { useState, useEffect } from "react";
import fileSvg from "../assets/file.svg"
import { z, ZodError } from "zod"
import { api, type CustomAxiosError } from "../services/api";
import type { RefundAPIResponse } from "../dtos/refund";
import { useAlert } from "../contexts/AlertContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useAuth } from "../hooks/useAuth";

const refundSchema = z.object({
    name: z.string().min(3, { message: "Informe o nome da solicitação, deve conter pelo menos 3 caracteres" }),
    category: z.string().min(1, { message: "Selecione uma categoria" }),
    amount: z.coerce.number({ message: "Informe um valor válido" }).min(1),
})


export function Refund() {
    const params = useParams<{ id: string }>()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(!!params.id)
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [amount, setAmount] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState("")
    const [fileURL, setFileURL] = useState<string | null>(null)
    const { showAlert } = useAlert()
    const { session } = useAuth()
    const navigate = useNavigate()

    async function registration(e: React.SubmitEvent) {
        e.preventDefault()

        if (params.id) {
            return navigate(-1)
        }

        if (!file) {
            return setError("Selecione um arquivo")
        }

        try {
            setIsLoading(true)
            setError("")

            const fileUploadForm = new FormData()
            fileUploadForm.append("file", file)

            const response = await api.post("/uploads", fileUploadForm)

            const data = refundSchema.parse({
                name,
                category,
                amount: amount.toString().replace(",", "."),
            })


            await api.post("/refunds", { ...data, filename: response.data.filename })

            setOpen(true)

        } catch (error) {
            if (error instanceof ZodError) {
                setError(error.issues[0].message)

                return setIsLoading(false)
            }

            const err = error as CustomAxiosError

            showAlert(err.messageFriendly || "Ocorreu um erro ao solicitar o reembolso")
        } finally {
            setIsLoading(false)
        }

    }

    async function fetchRefund(id: string) {
        try {
            setIsLoading(true)
            const { data } = await api.get<RefundAPIResponse>(`/refunds/${id}`)

            setName(data.name)
            setCategory(data.category)
            setAmount(formatCurrency(data.amount))
            setFileURL(data.filename)

        } catch (error) {
            const err = error as CustomAxiosError

            showAlert(err.messageFriendly || "Não foi possível carregar esta solicitação")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (params.id) {
            fetchRefund(params.id)
        }
    }, [params.id])

    function resetForm() {
        setIsLoading(false)
        setName("")
        setCategory("")
        setAmount("")
        setFile(null)
        setError("")
    }

    function handleCloseModal() {
        if (!params.id) {
            resetForm()
            setOpen(false)
        }
        setOpen(false)
    }

    async function handleDelete(id: string | undefined) {
        try {
            await api.delete(`/refunds/${id}`)
            navigate(-1)
        } catch (error) {
            const err = error as CustomAxiosError

            showAlert(err.messageFriendly || "Não foi possível deletar a solicitação")
        }
    }

    return (
        <form onSubmit={registration} className="w-full p-10 rounded-xl shadow-indigo-glow flex flex-col gap-6">
            <header className="text-xl font-semibold">
                <h1> Solicitação de Reembolso</h1>
                <p className="text-xs font-extralight mt-2 mb-4">Por favor, preencha os dados abaixo para solicitar o reembolso.</p>
            </header>
            <Input required legend="Nome da solicitação" onChange={(e) => { setName(e.target.value) }} value={name} disabled={!!params.id} />
            <div className="flex justify-between items-center gap-4">
                <Select required legend="Categoria" disabled={!!params.id} onChange={(e) => { setCategory(e.target.value) }} value={category}>
                    {
                        CATEGORIES_KEYS.map((category) => (
                            <option className="bg-gray-950" key={category} value={category}>
                                {CATEGORIES[category].name}
                            </option>
                        ))
                    }
                </Select>
                <Input legend="Valor" required onChange={(e) => { setAmount(e.target.value) }} value={amount} disabled={!!params.id} />
            </div>
            {
                !isLoading && (
                    (params.id && fileURL) ?

                        <p className="flex items-center text-sm justify-center gap-2 font-semibold my-6 hover:opacity-60 transition ease-linear cursor-pointer" onClick={() => setOpen(true)}>
                            <img src={fileSvg} alt="Ícone de arquivo" className="w-8" /> Abrir Comprovante
                        </p>
                        : <Upload onChange={(e) => e.target.files && setFile(e.target.files[0])} isLoading={isLoading} filename={file && file.name} name="file" />
                )
            }
            {
                !params.id && (
                    <div className="w-95 min-h-5 flex justify-center">
                        {
                            error && (
                                <p className="text-sm text-red-500 text-center">{error}</p>
                            )
                        }
                    </div>
                )
            }

            {
                params.id && session?.user.role === "employee" && (
                    <Button className="hover:bg-red-500" onClick={() => handleDelete(params.id)}>Deletar Solicitação</Button>
                )
            }

            <Button type="submit" isLoading={isLoading}>
                {params.id ? "Voltar" : "Enviar"}
            </Button>


            {
                open &&
                <ConfirmModal isOpen={open} onClose={() => handleCloseModal()} variant={params.id ? "image" : "base"}
                    imageSrc={fileURL ?? undefined} />
            }
        </form>
    )
}