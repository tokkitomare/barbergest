import { useState } from "react";

export default function Home() {
    const [isStaff, setIsStaff] = useState(true);

    return (
        <>
            <div id="about" className="
                mx-5 flex items-center justify-between space-x-4 px-2 py-1 bg-white/25 rounded-4xl 
                border border-white/40 shadow-[0px_0px_25px_rgba(255,235,255,0.2)]">
                
                <section className="p-3 flex-col w-full">
                    <h1 className="text-4xl font-huninn text-center text-shadow-[0px_0px_25px_rgba(255,235,255,0.9)]">Sobre nós</h1>
                    <button id="toggle-example" className="mb-4 px-4 py-1 rounded-full border border-white/30 
                        bg-white/30 hover:bg-white/40 hover:scale-105 duration-500 cursor-pointer transition backdrop-blur-md 
                        shadow-[0px_0px_25px_rgba(255,235,255,0.3)]" onClick={() => setIsStaff(!isStaff)}>
                            {isStaff ? "Você é cliente? Clique aqui." : "Você tem barbearia/salão? Clique aqui."}
                        </button>
                    <br />
                    
                    {isStaff ? (
                        <>
                            <p>
                                Somos um site feito para ajudar a gerir 
                                <span className="text-orange-300 font-bold"> barbearias/salões de beleza</span>
                                , dentro de nosso site temos funcionalidades como:
                            </p>
                            <ul className="list-disc px-5 py-1 text-orange-300 font-bold">
                                <li>Áreas para gerenciar clientes e funcionários</li>
                                <li>Calendário com seus agendamentos/eventos</li>
                                <li>Listagem de produtos registrados e lista de compras para novos produtos</li>
                                <li>Relatórios/histórico</li>
                                <li>E muito mais!</li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <p>
                                Somos um site feito para te ajudar a gerenciar coisas como seus agendamentos e 
                                pagamentos na sua <span className="text-orange-300 font-bold"> barbearia/salão de beleza</span> preferido, dentro 
                                de nosso site temos funcionalidades como:
                            </p>
                            <ul className="list-disc px-5 py-1 text-orange-300 font-bold">
                                <li>Calendário com seus agendamentos</li>
                                <li>Histórico de idas e de pagamentos</li>
                                <li>Funcionalidade para o profissional informar quando estiver chegando sua vez</li>
                                <li>Pesquisar diversas barbearias/salões registrados</li>
                            </ul>
                        </>
                    )}
                    
                    <img className="h-50 w-full rounded-2xl shadow-[0px_0px_25px_rgba(255,235,255,0.3)] hover:scale-101
                    transform transition-all duration-300 ease-in-out" id="example-img" 
                    src={ isStaff ? 
                        "../images/imagemteste.png" : 
                        "https://img.freepik.com/fotos-gratis/resumo-luxo-macio-fundo-vermelho-projeto-de-layout-dos-namorados-de-natal-estudio-sala-modelo-da-web-relatorio-de-negocios-com-cor-gradiente-de-circulo-suave_1258-54521.jpg" 
                    }
                    alt="barbergest-funcionamento-exemplo" />
                </section>
            </div>

            <div id="payment" className="
                mx-5 my-8 flex items-center justify-between space-x-4 px-2 py-1 bg-white/25 rounded-4xl 
                border border-white/40 shadow-[0px_0px_25px_rgba(255,235,255,0.2)]">
                <section className="p-3 flex-col w-full">
                    <h1 className="text-4xl font-huninn text-center text-shadow-[0px_0px_25px_rgba(255,235,255,0.9)]">
                        Pagamento
                    </h1 >
                    <br />
                    <p>
                        Para registrar seu negócio é necessário:
                    </p>
                    <ul className="list-disc px-5 py-1 text-orange-300 font-bold">
                        <li>Ter cartão de débito ou crédito</li>
                    </ul>
                    <p>
                        Isso mesmo, é realmente muito simples. Mas como você vai saber se o serviço é bom mesmo?
                        Experimente nossos 7 dias <span className="text-orange-300 font-extrabold">totalmente GRÁTIS. <br /></span>
                        Sem nem precisar de um cartão de crédito/débito! Somente com seu número de telefone ou CPF você pode
                        desfrutar do <span className="text-orange-300 font-extrabold">GestBarber</span> por 7 dias. <br />
                        Para isso: {""}
                        <a 
                        className="hover:underline font-huninn text-3xl text-orange-300 font-extrabold text-shadow-[0px_0px_25px_rgba(255,178,0,0.5)]" 
                        href="#">
                            clique aqui
                        </a>
                    </p>
                    <br />
                    <p>
                        Caso você já conheça o serviço, você pode {""}
                        <a 
                        className="font-huninn text-orange-300 font-extrabold 
                        text-shadow-[0px_0px_25px_rgba(255,178,0,0.8)] hover:underline" href="#">CLICAR AQUI</a> e 
                        ver a tabela de preços e métodos de pagamento.
                    </p>
                </section>
            </div>

            <div id="support" className="
                mx-5 my-8 flex items-center justify-between space-x-4 px-2 py-1 bg-white/25 rounded-4xl 
                border border-white/40 shadow-[0px_0px_25px_rgba(255,235,255,0.2)]">
                <section className="p-3 flex-col w-full">
                    <h1 className="text-4xl font-huninn text-center text-shadow-[0px_0px_25px_rgba(255,235,255,0.9)]">
                        Suporte
                    </h1>
                    <br />
                    <p>Quer falar conosco e tirar dúvidas ou dar sugestões?</p><br />
                    <p>Nosso whatsapp: {""}
                        <a 
                        className="font-huninn text-orange-300 font-extrabold 
                        text-shadow-[0px_0px_25px_rgba(255,178,0,0.8)] hover:underline" 
                        href="https://wa.me/5581999999999?text=Olá,%20quero%20solicitar%20suporte" target="_blank">
                            +55 (81) 9 9999-9999
                        </a>
                    </p>
                    <p>Nosso email: {""}
                        <a 
                        className="font-huninn text-orange-300 font-extrabold 
                        text-shadow-[0px_0px_25px_rgba(255,178,0,0.8)] hover:underline" 
                        href="mailto:barbergest.suporte@gmail.com" target="_blank">
                            barbergest.suporte@gmail.com
                        </a>
                    </p>
                    <p>Nosso repositório: {""}
                        <a 
                        className="font-huninn text-orange-300 font-extrabold 
                        text-shadow-[0px_0px_25px_rgba(255,178,0,0.8)] hover:underline" 
                        href="https://github.com/tokkitomare/barbergest" target="_blank">
                            BarberGest GitHub
                        </a>
                    </p>
                </section>
            </div>
        </>
    );
}