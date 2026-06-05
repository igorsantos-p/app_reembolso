import { useActionState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { api } from "../services/api"
import { AxiosError } from "axios"
import { z, ZodError } from "zod"
import { useAuth } from "../hooks/useAuth"

const signInSchema = z.object({
    email: z.email({ message: "E-mail inválido" }),
    password: z.string().trim().min(6, { message: "A senha deve conter pelo menos 6 caracteres" })
})

export function SignIn() {
    const [state, formAction, isLoading] = useActionState(signIn, null)
    const auth = useAuth()

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
                return { message: error.issues[0].message }
            }

            if (error instanceof AxiosError) {
                return { message: error.response?.data.message }
            }
        }
    }

    return (
        <form action={formAction} className="w-full flex flex-col gap-4">
            <Input type="email" name="email" required legend="E-mail" placeholder="seu@email.com" />
            <Input type="password" name="password" required legend="Senha" placeholder="••••••" />
            {
                state?.message ? <p className="text-sm self-center text-red-500">{state?.message}</p> : <div className="h-5 w-full"></div>
            }

            <Button type="submit" isLoading={isLoading}>Entrar</Button>

            <a href="/signup" className="text-sm text-center mt-10 mb-4 hover:text-indigo-300 transition ease-linear">Criar conta</a>
        </form>
    )
}