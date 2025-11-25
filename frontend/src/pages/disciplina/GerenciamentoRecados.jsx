import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function GerenciamentoRecados() {
  const { id } = useParams(); // id da disciplina
  const navigate = useNavigate();
  const [disciplina, setDisciplina] = useState(null);
  const [recados, setRecados] = useState([]);
  const [recadoForm, setRecadoForm] = useState({
    id_recado: null,
    tipo_evento: "trabalho",
    descricao: "",
    data: "",
    horario: "",
    link_material: "",
  });

  // Carregar disciplina e recados
  useEffect(() => {
    fetch(`http://localhost:3000/api/disciplinas/${id}/recados`)
      .then(r => r.json())
      .then(d => setDisciplina(d));

    carregarRecados();
  }, [id]);

  function carregarRecados() {
    fetch(`http://localhost:3000/api/disciplinas/${id}/recados`)
      .then(r => r.json())
      .then(d => setRecados(d));
  }

  // Manipulação do formulário
  function handleChange(e) {
    setRecadoForm({ ...recadoForm, [e.target.name]: e.target.value });
  }

  function limparFormulario() {
    setRecadoForm({
      id_recado: null,
      tipo_evento: "trabalho",
      descricao: "",
      data: "",
      horario: "",
      link_material: "",
    });
  }

  // CRUD
  function salvarRecado() {
    const url = recadoForm.id_recado
      ? `http://localhost:3000/api/recados/${recadoForm.id_recado}`
      : `http://localhost:3000/api/disciplinas/${id}/recados`;
    const metodo = recadoForm.id_recado ? "PUT" : "POST";

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...recadoForm, id_disciplina: id }),
    })
      .then(r => r.json())
      .then(d => {
        alert(d.message || "Operação concluída");
        limparFormulario();
        carregarRecados();
      });
  }

  function editarRecado(r) {
    setRecadoForm({
      id_recado: r.id_recado,
    tipo_evento: r.tipo_evento || "trabalho",
    descricao: r.descricao || "",
    data_entrega: r.data_entrega ? r.data_entrega.split("T")[0] : "",
    horario_prova: r.horario_prova || "",
    link_material: r.link_material || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function removerRecado(id_recado) {
    if (!confirm("Deseja remover este recado?")) return;

    console.log(`${id_recado}`);

    fetch(`http://localhost:3000/api/recados/${id_recado}`, { method: "DELETE" })
      .then(r => r.json())
      .then(d => {
        alert(d.message || "Removido");
        carregarRecados();
      });
  }

  if (!disciplina) return <p>Carregando...</p>;

  return (
    <div className="op-container">
      <h1>Gerenciar Recados da disciplina: {disciplina.nome}</h1>
      <button onClick={() => navigate(-1)}>Voltar</button>

      {/* Formulário de Recado */}
      <div className="op-form">
        <label>Tipo de evento:</label>
        <select name="tipo_evento" value={recadoForm.tipo_evento} onChange={handleChange}>
          <option value="trabalho">Trabalho</option>
          <option value="prova">Prova</option>
          <option value="ocorrencia">Ocorrência</option>
          <option value="material">Material</option>
        </select>

        <label>Descrição:</label>
        <textarea name="descricao" value={recadoForm.descricao} onChange={handleChange} />

        <label>Data de entrega:</label>
        <input type="date" name="data" value={recadoForm.data || ""} onChange={handleChange} />

        <label>Horário:</label>
        <input type="time" name="horario" value={recadoForm.horario || ""} onChange={handleChange} />

        <label>Link do material:</label>
        <input name="link_material" value={recadoForm.link_material} onChange={handleChange} />

        <button onClick={salvarRecado}>
          {recadoForm.id_recado ? "Salvar Edição" : "Adicionar Recado"}
        </button>

        {recadoForm.id_recado && (
          <button type="button" className="cancelar-btn" onClick={limparFormulario}>
            Cancelar edição
          </button>
        )}
      </div>

      {/* Lista de Recados */}
      <div className="op-list">
        {recados.length === 0 && <p>Nenhum recado cadastrado.</p>}

        {recados.map(r => (
          <div key={r.id_recado} className="op-card">
            <p><strong>{r.tipo_recado}</strong>: {r.descricao}</p>
            <p><strong>Entrega:</strong> {new Date(r.data).toLocaleDateString("pt-BR")}</p>
            <p><strong>Horário:</strong> {r.horario}</p>
            {r.link_material && <a href={r.link_material} target="_blank" rel="noopener noreferrer">Material</a>}
            <div className="op-actions">
              <button className="btn-edit" onClick={() => editarRecado(r)}>Editar</button>
              <button className="btn-remove" onClick={() => removerRecado(r.id_recado)}>Remover</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
