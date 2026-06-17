import { useAuth } from "../hooks/useAuth"
import logout from "../assets/logout.svg"
import { Link } from "react-router"

export function Header() {
    const { session, remove } = useAuth()


    return (
        <header className="w-full flex flex-row-reverse py-8">
            <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">Olá, {session?.user.name}</span>
                {
                    session?.user.role === "employee" && (
                        <Link to={"/refunds/solicitacoes"}>Minhas Solicitações</Link>
                    )
                }
                <img onClick={remove} src={logout} alt="Ícone de logout" className="cursor-pointer hover:scale-110 transition ease-linear" />
            </div>
        </header>
    )
}