import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/oportunidade/OportunidadeMentor.css";

export default function GerenciamentoDisciplina() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [form, setForm] = useState({
        id_disciplina: null,
        nome: "",
        curso: "",
        professor: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        carregarDisciplinas();
    }, []);

    function carregarDisciplinas() {
        fetch("http://localhost:3000/api/disciplinas")
            .then(r => r.json())
            .then(d => setDisciplinas(d));
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function salvarDisciplina() {
        const url = form.id_disciplina
            ? `http://localhost:3000/api/disciplinas/${form.id_disciplina}`
            : "http://localhost:3000/api/disciplinas";
        const metodo = form.id_disciplina ? "PUT" : "POST";

        fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then(r => r.json())
            .then(d => {
                alert(d.message || "Operação concluída");
                limparFormulario();
                carregarDisciplinas();
            });
    }

    function editarDisciplina(d) {
        setForm(d);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function removerDisciplina(id) {
        if (!confirm("Deseja remover esta disciplina?")) return;
        fetch(`http://localhost:3000/api/disciplinas/${id}`, { method: "DELETE" })
            .then(r => r.json())
            .then(d => {
                alert(d.message || "Removido");
                carregarDisciplinas();
            });
    }

    function limparFormulario() {
        setForm({ id_disciplina: null, nome: "", curso: "", professor: "" });
    }

    return (
        <div className="op-container">
            <h1>Gerenciar Disciplinas</h1>

            {/* Formulário de Disciplinas */}
            <div className="op-form">
                <label>Nome da disciplina:</label>
                <input name="nome" value={form.nome} onChange={handleChange} />

                <label>Curso:</label>
                <input name="curso" value={form.curso} onChange={handleChange} />

                <label>Professor:</label>
                <input name="professor" value={form.professor} onChange={handleChange} />

                <button onClick={salvarDisciplina}>
                    {form.id_disciplina ? "Salvar Edição" : "Adicionar"}
                </button>

                {form.id_disciplina && (
                    <button type="button" className="cancelar-btn" onClick={limparFormulario}>
                        Cancelar edição
                    </button>
                )}
            </div>

            {/* Lista de Disciplinas */}
            <h2>Disciplinas existentes</h2>
            <div className="op-list">
                {disciplinas.length === 0 && <p>Nenhuma disciplina cadastrada.</p>}
                {disciplinas.map(d => (
                    <div key={d.id_disciplina} className="op-card">
                        <div className="op-header">
                            <h3>{d.nome}</h3>
                        </div>

                        <p><strong>Curso:</strong> {d.curso}</p>
                        <p><strong>Professor:</strong> {d.professor}</p>

                        <div className="op-actions">
                            <button className="btn-edit" onClick={() => editarDisciplina(d)}>Editar</button>
                            <button className="btn-remove" onClick={() => removerDisciplina(d.id_disciplina)}>Remover</button>
                            <button className="btn-recados" onClick={() => navigate(`/gerenciamento-disciplinas/${d.id_disciplina}`)}>Gerenciar Recados</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
