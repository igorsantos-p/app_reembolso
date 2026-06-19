import { Outlet } from "react-router"
import { Header } from "./Header"

export function AppLayout() {
    return (
        <div className="w-screen h-screen flex flex-col items-center">
            <main className="sm:w-150 mx-2 w-[90%]">
                <Header />
                <Outlet />
            </main>
        </div>
    )
}