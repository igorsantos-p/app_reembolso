import { useAuth } from "../hooks/useAuth"
import { Link } from "react-router"
import menuSvg from "../assets/menu.svg"

export function Header() {
    const { session, remove } = useAuth()


    return (
        <header className="w-full flex flex-row-reverse py-8">
            <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">Olá, {session?.user.name}</span>
                {

                    session?.user.role === "manager" ?
                        (
                            <Link to={"/"} className="flex items-center gap-1 text-sm text-indigo-900 font-semibold hover:text-indigo-700 transition ease-linear" onClick={remove}>
                                Sair
                            </Link>
                        )
                        :
                        (
                            <>
                                <button popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }} className="cursor-pointer hover:brightness-150 transition ease-linear">
                                    <img src={menuSvg} alt="Ícone de menu" className="w-8" />
                                </button>

                                <ul className="dropdown menu w-52 rounded-box bg-gray-900 shadow-indigo-glow text-xs"
                                    popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" }}>
                                    <li onClick={() => document.getElementById("popover-1")?.hidePopover()}>
                                        <Link to={"/refunds/solicitacoes"}>Minhas Solicitações</Link>
                                    </li>
                                    <li className="flex" onClick={remove}>
                                        <Link to="">Sair</Link>
                                    </li>
                                </ul>
                            </>
                        )

                }
            </div>
        </header>
    )
}