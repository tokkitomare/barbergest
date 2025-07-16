import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Register() {
    interface JwtPayloadClaims {
        email: string;
        is_client: boolean;
        exp: number;
        iat: number;
    }

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [status, SetStatus] = useState<[string, boolean]>(["", false]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch("http://localhost:3000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                if (response.status === 404) {
                    SetStatus(["Email e/ou senha incorretos.", false]);
                } else {
                    SetStatus([`Erro ao tentar entrar na conta! Error ${response.status}`, false]);
                }

                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                SetStatus(["Sucesso!", true]);
            }

            const json = await response.json();
            const jwt = json.token;
            console.log(jwt);

            if (jwt) {
                localStorage.setItem("token", jwt);

                try {
                    const data = jwtDecode<JwtPayloadClaims>(jwt);
                    if (!data.is_client) {
                        navigate("/barber/dashboard");
                    } else {
                        navigate("/client/dashboard");
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.warn("Token não encontrado.");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="
            mx-5 my-8 flex items-center justify-between space-x-4 px-2 py-1 
            bg-white/25 rounded-4xl border border-white/40 
            shadow-[0px_0px_25px_rgba(255,235,255,0.2)]">

            <section className="p-6 w-full">
                <h1 className="text-4xl font-huninn text-center mb-6 
                    text-shadow-[0px_0px_25px_rgba(255,235,255,0.9)]">
                    Entrar na conta
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleChange}
                        className="px-4 py-2 rounded-full bg-white/30 border border-white/40 
                            shadow-[0px_0px_15px_rgba(255,235,255,0.2)] 
                            placeholder-white/80 text-white focus:outline-none 
                            focus:ring-2 focus:ring-orange-300 backdrop-blur-md"
                        required
                    />

                    <button
                        type="submit"
                        className="
                            shadow-[0px_0px_25px_rgba(255,235,255,0.3)] mt-4 px-6 py-2 rounded-full
                            bg-orange-600 hover:bg-orange-700 text-white 
                            font-bold hover:scale-102 duration-500 cursor-pointer 
                            transition backdrop-blur-md"
                    >
                        Entrar
                    </button>
                { status[0] && (
                    status[1] ? (
                        <div className="rounded-full bg-green-500/75 flex justify-center 
                            font-huninn shadow-[0px_0px_25px_rgba(0,255,183,0.6)] selection:bg-[#333]!">
                            <span className="text-center text-">
                                {status[0]} <br />
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
