import foodSvg from "../assets/food.svg"
import otherSvg from "../assets/other.svg"
import transportSvg from "../assets/transport.svg"
import serviceSvg from "../assets/service.svg"
import accommodationSvg from "../assets/accommodation.svg"

export const CATEGORIES = {
    food: {
        name: "Alimentação",
        icon: foodSvg,
    },
    accommodation: {
        name: "Acomodação",
        icon: accommodationSvg,
    },
    transport: {
        name: "Transporte",
        icon: transportSvg,
    },
    service: {
        name: "Serviços",
        icon: serviceSvg,
    },
    others: {
        name: "Outros",
        icon: otherSvg,
    },
}

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>