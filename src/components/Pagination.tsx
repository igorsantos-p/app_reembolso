import { Button } from "./Button"
import rightSvg from "../assets/right.svg"
import leftSvg from "../assets/left.svg"

type Props = {
    current: number
    total: number
}

export function Pagination({ current, total }: Props) {
    return (
        <div className="flex justify-center items-center gap-4">
            <Button variant="icon" className="w-6 h-6">
                <img src={leftSvg} alt="" className="w-8" />
            </Button>
            <span className="text-sm">{current}/{total}</span>
            <Button variant="icon" className="w-6 h-6"><img src={rightSvg} alt="" className="w-8" /> </Button>
        </div>
    )
}