import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        if (formData.name == "admin") {
            navigate("/barber/dashboard");
        } else {
            navigate("/client/dashboard");
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
                    Entrar na conta
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
                </form>
            </section>
        </div>
    );
}
