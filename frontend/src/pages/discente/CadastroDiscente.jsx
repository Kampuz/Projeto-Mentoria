import { useState } from "react";

export default function CadastroDiscente() {
  const [form, setForm] = useState({
    nome: "",
    email: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function enviar() {
    fetch("http://localhost:3000/api/discentes", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(form)
    })
    .then(r => r.json())
    .then(d => {
      if (d.error) {
        alert("Erro: " + d.error);
      } else {
        alert("Aluno cadastrado com ID: " + d.id_discente);
        setForm({ nome: "", email: ""});
      }
    })
    .catch(() => alert("Erro ao comunicar com o servidor"));
  }

  return (
    <div>
      <h1>Cadastrar Discente</h1>
      
      <input
        name="nome"
        placeholder="Nome completo"
        value={form.nome}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <button onClick={enviar}>Salvar</button>
    </div>
  );
}
