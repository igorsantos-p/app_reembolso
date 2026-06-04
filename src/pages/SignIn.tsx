import { useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false)

    function onSignIn(formData: FormData) {


    }

    return (
        <form action={onSignIn} className="w-full flex flex-col gap-4">
            <Input type="email" name="email" required legend="E-mail" placeholder="seu@email.com" />
            <Input type="password" name="password" required legend="Senha" placeholder="••••••" />

            <Button type="submit" isLoading={isLoading}>Entrar</Button>

            <a href="/signup" className="text-sm text-center mt-10 mb-4 hover:text-indigo-300 transition ease-linear">Criar conta</a>
        </form>
    )
}