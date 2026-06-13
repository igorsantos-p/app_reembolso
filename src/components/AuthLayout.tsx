import { Outlet } from "react-router";

export function AuthLayout() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center m-2">
            <main className="p-8 rounded-xl shadow-indigo-glow md:min-w-md box-border">
                <Outlet />
            </main>

        </div>
    )
}