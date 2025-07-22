import FeatureList from "../../components/FeatureList";

export default function ClientHome() {
  return (
    <>
      <FeatureList
        title="Olá, Cliente!"
        items={[
          "Agendar horário em uma barbearia/salão",
          "Visualizar histórico de agendamentos",
          "Avaliar serviços e barbeiros",
          "Receber lembretes e notificações",
          "Favoritar barbeiros/salões",
        ]}
      />
      <img
        src="./images/client-dashboard.png"
        alt="Dashboard do Cliente"
        className="rounded-xl shadow-lg mt-4"
      />
    </>
  );
}
