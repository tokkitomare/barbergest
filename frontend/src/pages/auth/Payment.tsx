import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Payment() {
    const [showModal, setShowModal] = useState(false);

    const handleButtonModalRedirection = () => {
        setShowModal(true);
        window.open("https://mpago.la/16kUino", "_blank");
    }

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        isClient: false,
    });

    const [status, SetStatus] = useState<[string, boolean]>(["", false]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
        <>
            <div className="flex justify-around">
                <div className="mx-5 my-8 flex-col justify-center
                bg-white/25 rounded-4xl border border-white/40 
                shadow-[0px_0px_25px_rgba(255,235,255,0.2)] max-w-md w-full">

                    <section className="p-6 w-full">
                        <h1 className="text-4xl font-huninn text-center mb-6 
                        text-shadow-[0px_0px_25px_rgba(255,235,255,0.9)]">
                            Como viro barbearia registrada?
                        </h1>
                        <p>
                            Clique no botão abaixo e siga as etapas.
                            Com o pagamento efetuado, você ganhará uma conta com o email que você
                            botou e com a senha de sua escolha para sempre. <br /><br />
                            <span className="text-2xl text-shadow-[0px_0px_25px_rgba(255,235,255,0.9)]">Preço atual: R$10,00</span>
                        </p>
                    </section>

                    <div className="flex justify-center mb-6">
                        <button className="shadow-[0px_0px_25px_rgba(255,235,255,0.3)] px-6 py-2 rounded-full
                                    bg-orange-600 hover:bg-orange-700 text-white 
                                    font-bold hover:scale-102 duration-500 cursor-pointer 
                                    transition backdrop-blur-md"

                            onClick={handleButtonModalRedirection}
                        >
                            Registre-se agora mesmo!
                        </button>
                    </div>


                    {/* modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
                                <button
                                    className="absolute top-2 right-4 text-gray-600 text-xl font-bold cursor-pointer"
                                    onClick={() => setShowModal(false)}
                                >
                                    ×
                                </button>

                                <h2 className="text-2xl font-bold text-center mb-4 text-black">Com o pagamento efetuado:</h2>
                                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                                    <input
                                        type="text"
                                        placeholder="Nome da barbearia"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Senha"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />

                                    <button
                                        type="submit"
                                        className="cursor-pointer w-full bg-orange-600 text-white font-bold py-2 rounded-full hover:bg-orange-700 transition"
                                    >
                                        Registrar
                                    </button>
                                </form>
                                <p className="text-black">
                                    {status[0]}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}