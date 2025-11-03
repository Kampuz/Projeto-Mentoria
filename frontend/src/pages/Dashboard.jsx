import { useState } from "react";
import "../styles/Dashboard.css";

export default function Dashboard() {
  // Simulação de perguntas
  const [perguntas, setPerguntas] = useState([
    { id: 1, autor: "João", titulo: "Como usar React Router?", resposta: "Você deve envolver o app em <BrowserRouter> e usar <Routes> e <Route>." },
    { id: 2, autor: "Maria", titulo: "Diferença entre var, let e const?", resposta: "" },
  ]);

  const [novaPergunta, setNovaPergunta] = useState("");
  const [resposta, setResposta] = useState("");

  const handlePerguntar = () => {
    if (!novaPergunta.trim()) return;
    const nova = {
      id: perguntas.length + 1,
      autor: "Você",
      titulo: novaPergunta,
      resposta: "",
    };
    setPerguntas([...perguntas, nova]);
    setNovaPergunta("");
  };

  const handleResponder = (id) => {
    if (!resposta.trim()) return;
    setPerguntas(
      perguntas.map((p) =>
        p.id === id ? { ...p, resposta } : p
      )
    );
    setResposta("");
  };

  return (
    <div className="dashboard-container">
      <h1>Mural de Perguntas</h1>

      <div className="pergunta-form">
        <input
          type="text"
          placeholder="Digite sua dúvida..."
          value={novaPergunta}
          onChange={(e) => setNovaPergunta(e.target.value)}
        />
        <button onClick={handlePerguntar}>Enviar Pergunta</button>
      </div>

      <div className="mural">
        {perguntas.map((p) => (
          <div key={p.id} className="pergunta-card">
            <h3>{p.titulo}</h3>
            <p><strong>Autor:</strong> {p.autor}</p>

            {p.resposta ? (
              <div className="resposta">
                <strong>Resposta:</strong>
                <p>{p.resposta}</p>
              </div>
            ) : (
              <div className="resposta-form">
                <input
                  type="text"
                  placeholder="Responder como mentor..."
                  value={resposta}
                  onChange={(e) => setResposta(e.target.value)}
                />
                <button onClick={() => handleResponder(p.id)}>Responder</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
