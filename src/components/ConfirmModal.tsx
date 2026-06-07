import confirmSvg from '../assets/confirm.svg'
import { Button } from './Button'

type Props = {
    isOpen: boolean
    onClose: () => void
}

export function ConfirmModal({ isOpen, onClose }: Props) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 min-h-screen bg-black/80 flex flex-col justify-center items-center">
            <main className="w-max-[430px] rounded-lg shadow-indigo-glow py-6 flex flex-col items-center bg-gray-950 gap-6 px-12">
                <h1 className='font-semibold md:text-2xl'>Solicitação enviada com sucesso!</h1>
                <img src={confirmSvg} alt="Ícone de confirmação" className='w-32 h-auto md:w-64' />
                <p className='text-xs flex-wrap md:text-sm'>Seu pedido de reembolso foi enviado e está em análise.</p>
                <Button onClick={onClose}>Nova Solicitação</Button>
            </main>
        </div>
    )
}