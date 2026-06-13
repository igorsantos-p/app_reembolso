import { Link } from "react-router"
import error404 from "../assets/astronaut.svg"

export function NotFound() {
    return (
        <div className="relative flex items-center justify-center">
            <img src={error404} alt="Astronauta 404" className="absolute z-0 object-cover w-185 h-auto" />
            <div className="w-screen h-screen flex flex-col justify-center items-center z-10">

                <h1 className="text-6xl font-semibold text-shadow-lg text-shadow-indigo-500 md:text-9xl">404</h1>
                <p className="uppercase">Page not found</p>
                <Link to="/" className="text-xs mt-10 mb-4 hover:text-indigo-300 transition ease-linear">Voltar para a Home</Link>
            </div>
        </div>
    )
}