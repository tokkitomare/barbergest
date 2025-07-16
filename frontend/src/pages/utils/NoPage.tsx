import { Link } from "react-router-dom"

export default function NoPage() {
    return (
        <>
        <div className="flex flex-col justify-center items-center h-full relative">
            <h1 className="text-6xl font-extrabold absolute top-10 text-red-700 select-none">
                ERROR 404
            </h1>
            <h1 className="font-bold text-5xl text-shadow-[1px_1px_0px_black] text-center">
                Parece que você está perdido, <Link to="/" className="text-green-600 transform hover:scale-115 duration-300 ease-in-out inline-block">CLIQUE AQUI</Link> para voltar à página inicial.
            </h1>
        </div>
        </>
    );
}