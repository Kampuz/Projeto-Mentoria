import { useEffect, useState } from "react";
import "../styles/PerfilMentor.css";

export default function PerfilMentor({ alunoId }) {
  // Simulação de dados do mentor logado
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/alunos`)
      .then((res) => res.json())
      .then((data) => {
        const aluno = data.find((m) => m.id === alunoId);
        if (aluno) {
          setNome(aluno.nome);
          setEmail(aluno.email);
        }
      });
  }, [alunoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/mentores/${alunoId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        nome,
        email,
      }),
    });
    alert("Perfil atualizado!");
  };

  return (
    <div className="perfil-container">
      <h1>Perfil de Aluno</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            value={email}
            disabled
          />
        </label>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
