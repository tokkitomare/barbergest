import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isClient: true,
    });

    const [pwErr, setPwErr] = useState(false);

    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);

    const [status, SetStatus] = useState<[string, boolean]>(["", false]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password != formData.confirmPassword) {
            setPwErr(true);
            return;
        } else {
            setPwErr(false);
        }

        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            is_client: formData.isClient,
        };

        try {
            const response = await fetch("http://localhost:3000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                if (response.status === 409) {
                    SetStatus(["Esse email já está sendo usado.", false]);
                } else {
                    SetStatus([`Erro ao tentar cadastrar conta! Error ${response.status}`, false]);
                }
                
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                SetStatus(["Conta cadastrada com successo!", true]);
            }

            const json = await response.json();
            console.log(json);
        } catch (err) {
            console.error(err);
        }
    
    };

return (
    <div className="
            mx-5 my-8 flex items-center justify-between space-x-4 px-2 py-1 
            bg-white/25 rounded-4xl border border-white/40 
            shadow-[0px_0px_25px_rgba(255,235,255,0.2)]">

        <section className="p-6 w-full">
            <h1 className="text-4xl font-huninn text-center mb-6 
                    text-shadow-[0px_0px_25px_rgba(255,235,255,0.9)]">
                Criar Conta
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-4 py-2 rounded-full bg-white/30 border border-white/40 
                            shadow-[0px_0px_15px_rgba(255,235,255,0.2)] 
                            placeholder-white/80 text-white focus:outline-none 
                            focus:ring-2 focus:ring-orange-300 backdrop-blur-md"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-4 py-2 rounded-full bg-white/30 border border-white/40 
                            shadow-[0px_0px_15px_rgba(255,235,255,0.2)] 
                            placeholder-white/80 text-white focus:outline-none 
                            focus:ring-2 focus:ring-orange-300 backdrop-blur-md"
                    required
                />

                <div className="relative">
                    <input
                        type={!showPw ? "password" : "text"}
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleChange}
                        className="px-4 py-2 rounded-full bg-white/30 border border-white/40 
                                shadow-[0px_0px_15px_rgba(255,235,255,0.2)] 
                                placeholder-white/80 text-white focus:outline-none 
                                focus:ring-2 focus:ring-orange-300 backdrop-blur-md w-full"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-orange-300 cursor-pointer"
                    >
                        {!showPw ? "ver" : "ocultar"}
                    </button>
                </div>

                <div className="relative">
                    <input
                        type={!showConfirmPw ? "password" : "text"}
                        name="confirmPassword"
                        placeholder="Confirmar senha"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`px-4 py-2 rounded-full bg-white/30 border 
                                ${pwErr ? "border-red-500" : "border-white/40"}
                                shadow-[0px_0px_15px_rgba(255,235,255,0.2)] 
                                placeholder-white/80 text-white focus:outline-none 
                                focus:ring-2 focus:ring-orange-300 backdrop-blur-md w-full`}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPw(!showConfirmPw)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-orange-300 cursor-pointer"
                    >
                        {!showConfirmPw ? "ver" : "ocultar"}
                    </button>
                </div>

                {pwErr &&
                    <span className="text-red-500 text-sm">Senhas não coindidem</span>
                }

                <div className="flex items-center space-x-2 mt-4">
                    {/* <label htmlFor="verify">
                        Você está se cadastrando como empresa?
                    </label>

                    <input
                        type="checkbox"
                        id="verify"
                        name="verify"
                        className="h-5 w-5 text-orange-300 bg-white/30 border-white/40 rounded-md 
                            focus:ring-orange-300 focus:ring-2 transition duration-300 cursor-pointer"
                        checked={!formData.isClient}
                        onChange={() => setFormData({ ...formData, isClient: !formData.isClient })}
                    />

                    <label>
                        (caso você seja um cliente, não marque)
                    </label> */}

                    <Link to={"/payment"} className="text-yellow-300">Esta área de criação de contas é apenas para clientes! Se você é a barbearia, clique aqui.</Link>

                </div>

                <button
                    type="submit"
                    className="
                            shadow-[0px_0px_25px_rgba(255,235,255,0.3)] mt-4 px-6 py-2 rounded-full
                            bg-orange-600 hover:bg-orange-700 text-white 
                            font-bold hover:scale-102 duration-500 cursor-pointer 
                            transition backdrop-blur-md"
                >
                    Criar conta
                </button>
                { status[0] && (
                    status[1] ? (
                        <div className="rounded-full bg-green-500/75 flex justify-center 
                            font-huninn shadow-[0px_0px_25px_rgba(0,255,183,0.6)] selection:bg-[#333]!">
                            <span className="text-center text-">
                                {status[0]} <br />
                                <Link to="/login" className="hover:underline">Clique aqui para ir ao LOGIN.</Link>
                            </span>
                        </div>
                    ) : (
                        <div className="rounded-full bg-red-500/75 flex justify-center 
                            font-huninn shadow-[0px_0px_25px_rgba(255,0,0,0.6)] selection:bg-[#333]!">
                            <span className="text-center text-">
                                {status[0]} <br />
                            </span>
                        </div>
                    ) 
                )}
            </form>
        </section>
    </div>
);
}
