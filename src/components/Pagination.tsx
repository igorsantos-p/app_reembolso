import { Button } from "./Button"
import rightSvg from "../assets/right.svg"
import leftSvg from "../assets/left.svg"
import firstPageSvg from "../assets/firstPage.svg"
import lastPageSvg from "../assets/lastPage.svg"

type Props = {
    current: number
    total: number
    onNext: () => void
    onPrevious: () => void
    onFirst: () => void
    onLast: () => void
}

export function Pagination({ current, total, onNext, onPrevious, onFirst, onLast }: Props) {
    return (
        <div className="flex justify-center items-center gap-4">
            <div className="flex gap-1">
                <Button variant="icon" className="w-6 h-6" onClick={onFirst} disabled={current === 1}>
                    <img src={firstPageSvg} alt="" className="w-8" />
                </Button>

                <Button variant="icon" className="w-6 h-6" disabled={current === 1}>
                    <img src={leftSvg} alt="" className="w-5" onClick={onPrevious} />
                </Button>
            </div>
            <span className="text-sm">{current}/{total}</span>
            <div className="flex gap-1">
                <Button variant="icon" className="w-6 h-6" disabled={current === total}><img src={rightSvg} alt="" className="w-5" onClick={onNext} /> </Button>

                <Button variant="icon" className="w-6 h-6" disabled={current === total}><img src={lastPageSvg} alt="" className="w-8" onClick={onLast} /> </Button>
            </div>
        </div>
    )
}