import { useEffect, useState } from "react";
import "../../styles/oportunidade/OportunidadeMentor.css";

export default function GerenciamentoDisciplina() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [form, setForm] = useState({
        id_disciplina: null,
        nome: "",
        curso: "",
        professor: ""
    });

    const [recados, setRecados] = useState([]);
    const [recadoForm, setRecadoForm] = useState({
        id_evento: null,
        id_disciplina: "",
        tipo_evento: "trabalho",
        descricao: "",
        data_entrega: "",
        horario_prova: "",
        link_material: ""
    });

    useEffect(() => {
        carregarDisciplinas();
    }, []);

    function carregarDisciplinas() {
        fetch("http://localhost:3000/api/disciplinas")
            .then(r => r.json())
            .then(d => setDisciplinas(d));
    }

    function carregarRecados(id_disciplina) {
        fetch(`http://localhost:3000/api/disciplinas/${id_disciplina}/recados`)
            .then(r => r.json())
            .then(d => setRecados(d));
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleRecadoChange(e) {
        setRecadoForm({ ...recadoForm, [e.target.name]: e.target.value });
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

    function salvarRecado() {
        const url = recadoForm.id_evento
            ? `http://localhost:3000/api/recados/${recadoForm.id_evento}`
            : `http://localhost:3000/api/disciplinas/${recadoForm.id_disciplina}/recados`;
        const metodo = recadoForm.id_evento ? "PUT" : "POST";

        fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recadoForm)
        })
            .then(r => r.json())
            .then(d => {
                alert(d.message || "Operação concluída");
                limparRecadoFormulario();
                carregarRecados(recadoForm.id_disciplina);
            });
    }

    function editarDisciplina(d) {
        setForm(d);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function editarRecado(r) {
        setRecadoForm({
            ...r,
            data_entrega: r.data_entrega ? r.data_entrega.split("T")[0] : "",
            horario_prova: r.horario_prova || ""
        });
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

    function removerRecado(id) {
        if (!confirm("Deseja remover este recado?")) return;
        fetch(`http://localhost:3000/api/recados/${id}`, { method: "DELETE" })
            .then(r => r.json())
            .then(d => {
                alert(d.message || "Removido");
                carregarRecados(recadoForm.id_disciplina);
            });
    }

    function limparFormulario() {
        setForm({ id_disciplina: null, nome: "", curso: "", professor: "" });
        setRecados([]);
    }

    function limparRecadoFormulario() {
        setRecadoForm({
            id_evento: null,
            id_disciplina: recadoForm.id_disciplina,
            tipo_evento: "trabalho",
            descricao: "",
            data_entrega: "",
            horario_prova: "",
            link_material: ""
        });
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
                            <button className="btn-edit" onClick={() => carregarRecados(d.id_disciplina)}>Ver Recados</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Formulário de Recados */}
            {recados.length > 0 && (
                <>
                    <h2>Recados</h2>
                    <div className="op-form">
                        <label>Tipo de evento:</label>
                        <select name="tipo_evento" value={recadoForm.tipo_evento} onChange={handleRecadoChange}>
                            <option value="trabalho">Trabalho</option>
                            <option value="prova">Prova</option>
                            <option value="ocorrencia">Ocorrência</option>
                            <option value="material">Material</option>
                        </select>

                        <label>Descrição:</label>
                        <textarea name="descricao" value={recadoForm.descricao} onChange={handleRecadoChange} />

                        <label>Data de entrega:</label>
                        <input type="date" name="data_entrega" value={recadoForm.data_entrega} onChange={handleRecadoChange} />

                        <label>Horário da prova:</label>
                        <input type="time" name="horario_prova" value={recadoForm.horario_prova} onChange={handleRecadoChange} />

                        <label>Link do material:</label>
                        <input name="link_material" value={recadoForm.link_material} onChange={handleRecadoChange} />

                        <button onClick={salvarRecado}>
                            {recadoForm.id_evento ? "Salvar Edição" : "Adicionar Recado"}
                        </button>

                        {recadoForm.id_evento && (
                            <button type="button" className="cancelar-btn" onClick={limparRecadoFormulario}>
                                Cancelar edição
                            </button>
                        )}
                    </div>

                    {/* Lista de Recados */}
                    <div className="op-list">
                        {recados.map(r => (
                            <div key={r.id_evento} className="op-card">
                                <p><strong>{r.tipo_evento}</strong>: {r.descricao}</p>
                                {r.data_entrega && <p><strong>Entrega:</strong> {r.data_entrega}</p>}
                                {r.horario_prova && <p><strong>Horário:</strong> {r.horario_prova}</p>}
                                {r.link_material && <a href={r.link_material} target="_blank">Material</a>}
                                <div className="op-actions">
                                    <button className="btn-edit" onClick={() => editarRecado(r)}>Editar</button>
                                    <button className="btn-remove" onClick={() => removerRecado(r.id_evento)}>Remover</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
