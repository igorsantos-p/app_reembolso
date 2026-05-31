import { useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

export function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function onSubmit(e: React.SubmitEvent) {
        e.preventDefault()
    }

    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
            <Input type="email" required legend="E-mail" placeholder="seu@email.com" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" required legend="Senha" placeholder="••••••" onChange={(e) => setPassword(e.target.value)} />

            <Button type="submit" isLoading={isLoading}>Entrar</Button>

            <a href="/signup" className="text-sm text-center mt-10 mb-4 hover:text-indigo-300 transition ease-linear">Criar conta</a>
        </form>
    )
}