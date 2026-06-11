import { useState } from "react"
import { useNavigate } from "react-router"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { z, ZodError } from "zod"
import { api, type CustomAxiosError } from "../services/api"
import { useAlert } from "../contexts/AlertContext"

const signUpSchema = z.object({
    name: z.string().trim().min(3, { message: "Nome é obrigatório, deve conter pelo menos 3 caracteres" }),
    email: z.email({ message: "E-mail inválido" }),
    password: z.string().trim().min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
    passwordConfirm: z.string({ message: "Confirme a senha" }).trim()
}).refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não são iguais", path: ["passwordConfirm"]
})

export function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const { showAlert } = useAlert()

    const navigate = useNavigate()

    async function onSubmit(e: React.SubmitEvent) {
        e.preventDefault()

        try {
            setIsLoading(true)

            const data = signUpSchema.parse({
                name,
                email,
                password,
                passwordConfirm
            })

            await api.post("/users", data)
            navigate("/")

        } catch (error) {
            if (error instanceof ZodError) {
                setError(error.issues[0].message)
                return
            }

            const err = error as CustomAxiosError

            return showAlert(err.messageFriendly || "Erro ao tentar realizar o cadastro.")


        } finally {
            setIsLoading(false)
        }

    }

    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
            <Input required legend="Nome" placeholder="Seu Nome" onChange={(e) => setName(e.target.value)} />
            <Input type="email" required legend="E-mail" placeholder="seu@email.com" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" required legend="Senha" placeholder="••••••" onChange={(e) => setPassword(e.target.value)} />
            <Input type="password" required legend="Confirmar Senha" placeholder="••••••" onChange={(e) => setPasswordConfirm(e.target.value)} />

            <div className="w-95 min-h-5 flex self-center justify-center">
                {
                    error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )
                }
            </div>

            <Button type="submit" isLoading={isLoading}>Criar</Button>

            <a href="/" className="text-sm text-center mt-10 mb-4 hover:text-indigo-300 transition ease-linear">Já tenho uma conta</a>
        </form>
    )
}