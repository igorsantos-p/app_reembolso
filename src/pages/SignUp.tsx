import { useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

export function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function onSubmit(e: React.SubmitEvent) {
        e.preventDefault()
    }

    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
            <Input required legend="Nome" placeholder="Seu Nome" onChange={(e) => setName(e.target.value)} />
            <Input type="email" required legend="E-mail" placeholder="seu@email.com" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" required legend="Senha" placeholder="••••••" onChange={(e) => setPassword(e.target.value)} />
            <Input type="password" required legend="Confirmar Senha" placeholder="••••••" onChange={(e) => setPasswordConfirm(e.target.value)} />

            <Button type="submit" isLoading={isLoading}>Criar</Button>

            <a href="/" className="text-sm text-center mt-10 mb-4 hover:text-indigo-300 transition ease-linear">Já tenho uma conta</a>
        </form>
    )
}