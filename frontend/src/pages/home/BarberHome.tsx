import FeatureList from "../../components/FeatureList";

export default function BarberHome() {
  return (
    <>
      <FeatureList
        title="Bem-vindo, Barbeiro!"
        items={[
          "Visualizar e gerenciar seus agendamentos",
          "Histórico de clientes atendidos",
          "Registrar novos produtos ou serviços",
          "Emitir relatórios financeiros",
          "Alterar disponibilidade no calendário",
        ]}
      />
      <img
        src="./images/barber-dashboard.png"
        alt="Dashboard do Barbeiro"
        className="rounded-xl shadow-lg mt-4"
      />
    </>
  );
}
