import "../styles/Mentoria.css";

export default function Mentores() {
  // Simulação de dados vindos do backend
  const mentores = [
    {
      id: 1,
      nome: "Ana Souza",
      email: "ana.souza@unesp.br",
      horario: "Seg e Qua - 14h às 16h",
      local: "Lab 10"
    },
    {
      id: 2,
      nome: "Bruno Lima",
      email: "bruno.lima@unesp.br",
      horario: "Ter e Qui - 10h às 12h",
      local: "Lab 10"
    },
    {
      id: 3,
      nome: "Carla Mendes",
      email: "carla.mendes@unesp.br",
      horario: "Sex - 9h às 11h",
      local: "Lab 10"
    },
  ];

  return (
    <div className="mentoria-container">
      <h1>Mentores Disponíveis</h1>
      <div className="mentoria-lista">
        {mentores.map((mentor) => (
          <div key={mentor.id} className="mentor-card">
            <h2>{mentor.nome}</h2>
            <p><strong>Email:</strong> {mentor.email}</p>
            <p><strong>Horários:</strong> {mentor.horario}</p>
            <p><strong>Local:</strong> {mentor.local}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
