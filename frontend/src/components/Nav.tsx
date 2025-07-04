import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
    const location = useLocation().pathname;
    let content;

    switch (location) {
        case "/staff":
            content = 
            <></>;
            break;
        case "/user":
            content = 
            <></>;
            break;
        default:
            content = 
            <>
                <Link to="/" className="
                    absolute m-6 font-huninn text-5xl
                    text-shadow-[0px_0px_25px_rgba(255,235,255,0.5)]
                    select-none hover:scale-102 transform transition-all duration-700 ease-in-out z-51"
                >
                    BarberGest ✂️
                </Link>
                <div className="sticky top-0 z-50">
                    <div className="flex items-center justify-between">
                        <h1>
                            {"            "}
                        </h1>
                    
                        <nav className="
                            m-5 flex items-center justify-between space-x-4 px-2 py-1 bg-white/25 rounded-full 
                            border border-white/40 shadow-[0px_0px_25px_rgba(255,235,255,0.2)] hover:scale-102 
                            transform transition-all duration-700 ease-in-out"
                            >
                            <div className="flex space-x-6 px-4 py-2 bg-white/40 
                            rounded-full shadow-[0px_0px_25px_rgba(255,235,255,0.2)] border border-white/30">
                                    <ThemeToggle />
                                    <a href="#about" className="hover:opacity-72 transition-opacity">Sobre</a>
                                    <a href="#payment" className="hover:opacity-72 transition">Pagamento</a>
                                    <a href="#support" className="hover:opacity-72 transition">Suporte</a>
                            </div>

                            <div className="flex space-x-1">
                                <Link to="#" className="px-4 py-1 rounded-full border border-white/30 
                                bg-white/30 hover:bg-white/40 transition backdrop-blur-md 
                                shadow-[0px_0px_25px_rgba(255,235,255,0.3)]">
                                    Entre
                                </Link>
                                <Link to="#" className="px-4 py-1 rounded-full bg-orange-600 
                                hover:bg-orange-700 transition 
                                shadow-[0px_0px_25px_rgba(255,235,255,0.3)]">
                                    Cadastre-se
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </>
            ;
    }

    return (
        <>
            {content}
        </>
    );
}