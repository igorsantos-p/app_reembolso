import error404 from "../assets/404.svg"

export function NotFound() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <img src={error404} alt="Astronauta 404" className="fixed inset-0 -z-10 h-screen w-screen object-fill hidden md:block" />
            <h1 className="text-6xl font-semibold text-shadow-lg text-shadow-indigo-500 md:text-9xl">404</h1>
            <p className="uppercase">Page not found</p>
            <a href="/" className="text-xs mt-10 mb-4 hover:text-indigo-300 transition ease-linear">Voltar para a Home</a>
        </div>
    )
}