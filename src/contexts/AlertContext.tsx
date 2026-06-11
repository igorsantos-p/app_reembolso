import { useState, useEffect, createContext, type ReactNode, useContext } from "react";
import errorSvg from "../assets/error.svg"


type AlertState = {
    isVisible: boolean
    message: string
    isLeaving: boolean
}

type AlertContextData = {
    showAlert: (message: string) => void
}

const AlertContext = createContext<AlertContextData | undefined>(undefined)

export function AlertProvider({ children }: { children: ReactNode }) {
    const [alert, setAlert] = useState<AlertState>({
        isVisible: false,
        message: "",
        isLeaving: false
    })

    function showAlert(message: string) {
        setAlert({
            isVisible: true,
            message,
            isLeaving: false
        })
    }

    useEffect(() => {
        if (!alert.isVisible || alert.isLeaving) {
            return
        }

        const leaveTimer = setTimeout(() => {
            setAlert((prev) => ({
                ...prev, isLeaving: true
            }))
        }, 4000)

        const removeTimer = setTimeout(() => {
            setAlert({
                isVisible: false,
                message: "",
                isLeaving: false
            })
        }, 4300)

        return () => {
            clearTimeout(leaveTimer)
            clearTimeout(removeTimer)
        }

    }, [alert.isVisible, alert.isLeaving])

    function closeAlert() {
        setAlert((prev) => ({ ...prev, isLeaving: true }))
        setTimeout(() => {
            setAlert({
                isVisible: false,
                message: "",
                isLeaving: false
            })
        }, 300)
    }

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {
                alert.isVisible && (
                    <div className="fixed top-4 left-0 right-0 z-9999! flex justify-center p-4 pointer-events-none">
                        <div className={`w-full max-w-md flex items-center gap-3 bg-gray-950 rounded-xl p-4 pointer-events-auto shadow-indigo-glow transition-all duration-300 ease-out transform
              ${alert.isLeaving
                                ? 'opacity-0 -translate-y-4 scale-95'
                                : 'opacity-100 translate-y-2 scale-100 animate-fade-in-down'
                            } `}>

                            <div>
                                <img src={errorSvg} className="w-8 h-8" alt="Ícone de erro" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold">
                                    Ops! Algo deu errado</p>
                                <p className="text-sm text-red-500 mt-1">{alert.message}</p>
                            </div>

                            <button
                                onClick={closeAlert}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )
            }
        </AlertContext.Provider>
    )
}

export function useAlert(): AlertContextData {
    const context = useContext(AlertContext)
    if (!context) {
        throw new Error("useAlert deve ser usado dentro de um AlertProvider")
    }
    return context
}