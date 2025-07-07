import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import BtnsDashboard from "./ButtonsDashboard";

export default function NavBar() {
    const location = useLocation().pathname;
    let content;

    if (location.startsWith("/barber")) {
        content = (
            <>
                <div className="bg-gray-950/45 bg-linear-to-r from-[#666] via-[#444] to-[#344] p-3 
                shadow-2xl rounded-2xl">
                    <div>
                        <h1 className="text-5xl font-huninn select-none">
                            BarberGest
                        </h1>
                    </div>
                    <nav className="flex justify-around bg-black/35 bg-linear-to-r from-[#111] to-[#333]  rounded-full font-huninn">
                        <BtnsDashboard texts={[
                            "Dashboard", "Clientes",
                            "Funcionários", "Serviços",
                            "Agendamentos", "Pagamentos",
                            "Produtos", "Caixa / Relatórios"
                            ]} 
                        />
                    </nav>
                </div>
            </>
        );
    } else if (location.startsWith("/client")) {
        content = (
            <>
                <div className="bg-gray-950/45 bg-linear-to-r from-[#666] via-[#444] to-[#344] p-3 
                shadow-2xl rounded-2xl">
                    <div>
                        <h1 className="text-5xl font-huninn select-none">
                            BarberGest
                        </h1>
                    </div>
                    <nav className="flex justify-center gap-5 bg-black/35 bg-linear-to-r from-[#111] to-[#333]  rounded-full font-huninn">
                        <BtnsDashboard texts={[
                            "Dashboard", "Calendário",
                            "Histórico de pagamentos"
                            ]} 
                        />
                    </nav>
                </div>
            </>
        );
    } else {
        content = (
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
                                <Link to="/login" className="px-4 py-1 rounded-full border border-white/30 
                                bg-white/30 hover:bg-white/40 transition backdrop-blur-md 
                                shadow-[0px_0px_25px_rgba(255,235,255,0.3)]">
                                    Entre
                                </Link>
                                <Link to="/register" className="px-4 py-1 rounded-full bg-orange-600 
                                hover:bg-orange-700 transition 
                                shadow-[0px_0px_25px_rgba(255,235,255,0.3)]">
                                    Cadastre-se
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </>
            );
    }


    return (
        <>
            {content}
        </>
    );
}