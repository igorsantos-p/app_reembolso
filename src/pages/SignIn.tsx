import { useActionState, useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { api, type CustomAxiosError } from "../services/api"
import { z, ZodError } from "zod"
import { useAuth } from "../hooks/useAuth"
import { useAlert } from "../contexts/AlertContext"
import { Link } from "react-router"
import { Loading } from "../components/Loading"

const signInSchema = z.object({
    email: z.email({ message: "E-mail inválido" }),
    password: z.string().trim().min(6, { message: "A senha deve conter pelo menos 6 caracteres" })
})

export function SignIn() {
    const [state, formAction, isLoading] = useActionState(signIn, null)
    const [error, setError] = useState("")
    const auth = useAuth()
    const { showAlert } = useAlert()

    async function signIn(_: any, formData: FormData) {
        const email = formData.get("email")
        const password = formData.get("password")

        try {
            const data = signInSchema.parse({
                email,
                password
            })

            const response = await api.post("sessions", data)
            auth.save(response.data)

        } catch (error) {
            if (error instanceof ZodError) {
                setError(error.issues[0].message)
                return { message: error.issues[0].message }
            }

            const err = error as CustomAxiosError
            showAlert(err.messageFriendly || "Erro ao tentar realizar o login.")
        }
    }

    useEffect(() => {
        if (state) {
            showAlert(state.message)
        }
    }, [state, showAlert])

    return (
        <form action={formAction} className="w-full flex flex-col gap-4">
            <Input type="email" name="email" required legend="E-mail" placeholder="seu@email.com" onChange={() => setError("")} />
            <Input type="password" name="password" required legend="Senha" placeholder="••••••" onChange={() => setError("")} />

            <div className="max-w-95 min-h-5 flex justify-center">
                {
                    state && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )
                }
            </div>
            <Button type="submit" isLoading={isLoading}>
                {
                    (
                        isLoading ? <Loading variant="icon" /> : "Entrar"
                    )
                }
            </Button>

            <Link to="/signup" className="text-sm text-center mt-10 mb-4 hover:text-indigo-300 transition ease-linear">Criar conta</Link>
        </form>
    )
}