import { Outlet } from "react-router";

export function AuthLayout() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <main className="bg-slate-950 p-8 rounded-xl shadow-md shadow-indigo-700/50 inset-2 inset-shadow-sm inset-shadow-indigo-500">
                <h1>Auth Layout</h1>
                <Outlet />
            </main>

        </div>
    )
}