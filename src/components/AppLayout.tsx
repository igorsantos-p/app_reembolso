import { Outlet } from "react-router"
import { Header } from "./Header"

export function AppLayout() {
    return (
        <div className="w-screen h-screen flex flex-col items-center m-2">
            <main className="w-full p-3 md:w-auto">
                <Header />
                <Outlet />
            </main>
        </div>
    )
}