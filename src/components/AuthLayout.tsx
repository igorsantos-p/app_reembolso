import { Outlet } from "react-router";

export function AuthLayout() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <main className="w-[82%] p-8 rounded-xl shadow-indigo-glow flex mx-2 sm:w-130">
                <Outlet />
            </main>

        </div>
    )
}