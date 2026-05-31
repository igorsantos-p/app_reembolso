import { Outlet } from "react-router"

export function AppLayout() {
    return (
        <div className="w-screen h-screen flex flex-col items-center">
            <main className="w-full p-3 md:w-auto">
                <Outlet />
            </main>
        </div>
    )
}