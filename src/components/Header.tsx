import { useAuth } from "../hooks/useAuth"
import logout from "../assets/logout.svg"

export function Header() {
    const auth = useAuth()

    function handleLogout() {
        auth.save(null)
    }
    return (
        <header className="w-full flex flex-row-reverse py-8">
            <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">Olá, {auth.session.user.name}</span>
                <img onClick={handleLogout} src={logout} alt="Ícone de logout" className="cursor-pointer hover:scale-110 transition ease-linear" />
            </div>
        </header>
    )
}