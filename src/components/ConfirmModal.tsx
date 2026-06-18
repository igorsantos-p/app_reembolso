import confirmSvg from '../assets/confirm.svg'
import { Button } from './Button'
import { useEffect } from "react"
import { classMerge } from '../utils/classMerge'
import iconClose from "../assets/xClose.svg"
import { api } from '../services/api'

type Props = {
    isOpen: boolean
    onClose: () => void
    variant?: "base" | "image"
    imageSrc?: string
}

const variants = {
    modal: {
        base: "w-content sm:w-150",
        image: "max-w-120 justify-center"
    }
}

export function ConfirmModal({ isOpen, onClose, variant = "base", imageSrc }: Props) {
    if (!isOpen) return null

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])


    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }


    return (
        <div className="fixed inset-0 min-h-screen bg-black/70 flex flex-col justify-center items-center" onClick={handleBackgroundClick}>
            <main className={classMerge([variants.modal[variant], "rounded-lg shadow-indigo-glow py-6 mx-4 flex flex-col items-center bg-gray-950 gap-6 px-12"])}>

                {
                    variant === "base" ?
                        (
                            <>
                                <h1 className='font-semibold text-center sm:text-2xl'>Solicitação enviada com sucesso!</h1>
                                <img src={confirmSvg} alt="Ícone de confirmação" className='w-32 h-auto sm:w-64' />
                                <p className='text-sm text-center flex-wrap sm:text-sx'>Seu pedido de reembolso foi enviado e está em análise.</p>
                                <Button onClick={onClose}>Nova Solicitação</Button>
                            </>
                        )
                        :
                        (
                            <>
                                <div className='w-full flex justify-end'>
                                    <img src={iconClose} alt="Ícone fechar modal" className='w-6 h-auto cursor-pointer hover:brightness-150 transition ease-linear self-end -mt-2 -mr-8' onClick={onClose} />
                                </div>
                                <img
                                    src={`${api.defaults.baseURL}/uploads/${imageSrc}`}
                                    alt="Visualização expandida"
                                    className="w-full h-auto object-contain rounded-lg shadow-2xl"
                                />
                            </>
                        )

                }


            </main>
        </div>
    )
}