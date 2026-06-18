import { createContext, type ReactNode, startTransition, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router";

type AuthContext = {
    isLoading: boolean
    session: null | UserAPIResponse
    save: (data: UserAPIResponse) => void
    remove: () => void
}

const LOCAL_STAROGE_KEY = "@refund"

export const AuthContext = createContext({} as AuthContext)


export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<null | UserAPIResponse>(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    function save(data: UserAPIResponse) {
        localStorage.setItem(`${LOCAL_STAROGE_KEY}:user`, JSON.stringify(data.user))
        localStorage.setItem(`${LOCAL_STAROGE_KEY}:token`, data.token)

        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

        setSession(data)
    }

    function loadUser() {
        const user = localStorage.getItem(`${LOCAL_STAROGE_KEY}:user`)
        const token = localStorage.getItem(`${LOCAL_STAROGE_KEY}:token`)

        if (token && user) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            setSession({
                token,
                user: JSON.parse(user)
            })
        }

        setIsLoading(false)
    }

    useEffect(() => {
        loadUser()
    }, [])

    function remove() {
        delete api.defaults.headers.common["Authorization"]
        localStorage.removeItem(`${LOCAL_STAROGE_KEY}:user`)
        localStorage.removeItem(`${LOCAL_STAROGE_KEY}:token`)

        startTransition(() => {
            setSession(null)
            navigate("/", { replace: true })
        })

    }

    return (
        <AuthContext.Provider value={{ session, save, isLoading, remove }}>
            {children}
        </AuthContext.Provider>
    )
}