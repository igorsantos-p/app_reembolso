import { Outlet } from "react-router";

export function AuthLayout() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <main className="bg-slate-950 p-8 rounded-xl shadow-indigo-glow md:min-w-md">
                <Outlet />
            </main>

        </div>
    )
}