import { useEffect, useState } from "react";
import "../styles/Dashboard.css";

export default function Dashboard({ alunoId, mentorId, isMentor }) {
  const [perguntas, setPerguntas] = useState([]);
  const [novaPergunta, setNovaPergunta] = useState("");
  const [respostas, setRespostas] = useState({}); // { perguntaId: resposta }

  useEffect(() => {
    fetch("http://localhost:3000/api/perguntas")
      .then((res) => res.json())
      .then(setPerguntas);
  }, []);

  const handlePerguntar = async () => {
    if (!novaPergunta.trim()) return;
    await fetch("http://localhost:3000/api/perguntas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id: alunoId, titulo: novaPergunta }),
    });
    setNovaPergunta("");
    // Recarregar perguntas
    const res = await fetch("http://localhost:3000/api/perguntas");
    setPerguntas(await res.json());
  };

  const handleResponder = async (id) => {
    const resposta = respostas[id];
    if (!resposta?.trim()) return;
    await fetch("http://localhost:3000/api/perguntas/responder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta_id: id, mentor_id: mentorId, conteudo: resposta }),
    });
    setRespostas((prev) => ({ ...prev, [id]: "" }));
    const res = await fetch("http://localhost:3000/api/perguntas");
    setPerguntas(await res.json());
  };

  return (
    <div className="dashboard-container">
      <h1>Mural de Perguntas</h1>

      {!isMentor && (
        <div className="pergunta-form">
          <input
            type="text"
            placeholder="Digite sua dúvida..."
            value={novaPergunta}
            onChange={(e) => setNovaPergunta(e.target.value)}
          />
          <button onClick={handlePerguntar}>Enviar Pergunta</button>
        </div>
      )}

      <div className="mural">
        {perguntas.map((p) => (
          <div key={p.pergunta_id} className="pergunta-card">
            <h3>{p.titulo}</h3>
            <p><strong>Autor:</strong> {p.autor}</p>

            {p.conteudo ? (
              <div className="resposta">
                <strong>Resposta:</strong>
                <p>{p.conteudo}</p>
                <p><em>{p.mentor}</em></p>
              </div>
            ) : (
              isMentor && (
                <div className="resposta-form">
                  <input
                    type="text"
                    placeholder="Responder como mentor..."
                    value={respostas[p.pergunta_id] || ""}
                    onChange={(e) =>
                      setRespostas((prev) => ({ ...prev, [p.pergunta_id]: e.target.value }))
                    }
                  />
                  <button onClick={() => handleResponder(p.pergunta_id)}>Responder</button>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
