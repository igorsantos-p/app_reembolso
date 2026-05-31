import logout from "../assets/logout.svg"

export function Header() {
    return (
        <header className="w-full flex flex-row-reverse">
            <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">Olá, usuário</span>
                <img src={logout} alt="Ícone de logout" className="cursor-pointer hover:scale-110 transition ease-linear" />
            </div>
        </header>
    )
}