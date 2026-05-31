import confirmSvg from '../assets/confirm.svg'
import { Button } from './Button'

interface ModalProps {
    isOpen: boolean,
    onClose: () => void
}

export function ConfirmModal({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 min-h-screen bg-black/80 flex flex-col justify-center items-center">
            <main className="w-max rounded-lg shadow-indigo-glow py-6 flex flex-col items-center bg-gray-950 gap-6 px-12">
                <h1 className='text-2xl font-semibold'>Solicitação enviada com sucesso!</h1>
                <img src={confirmSvg} alt="Ícone de confirmação" className='w-64 h-auto' />
                <p className='text-sm'>Seu pedido de reembolso foi enviado e está em análise.</p>
                <Button onClick={onClose}>Nova Solicitação</Button>
            </main>
        </div>
    )
}