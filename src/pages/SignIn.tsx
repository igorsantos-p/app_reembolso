import { Input } from "../components/Input"

export function SignIn() {
    return (
        <form className="w-full flex flex-col gap-4">
            <Input type="email" required legend="E-mail" placeholder="seu@email.com" />
            <Input type="password" required legend="Senha" placeholder="••••••" />
        </form>
    )
}