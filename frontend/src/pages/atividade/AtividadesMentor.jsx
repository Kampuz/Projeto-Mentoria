import { useEffect, useState } from "react";
import "../../styles/atividade/AtividadeMentor.css";

export default function GerenciamentoAtividades() {
    const [atividades, setAtividades] = useState([]);
    const [discentes, setDiscentes] = useState([]);
    const [form, setForm] = useState({
        id_atividade: null,
        titulo: "",
        tipo: "atendimento",
        descricao: "",
        data: "",
        local: "",
        tipo_atendimento: "individual",
        observacoes: "",
        id_mentor_responsavel: "",
        participantes: [] // [{ id_discente, papel }]
    });

    useEffect(() => {
        carregarAtividades();
        carregarDiscentes();
    }, []);

    async function carregarAtividades() {
        const resp = await fetch("http://localhost:3000/api/atividades");
        const data = await resp.json();
        setAtividades(data);
    }

    async function carregarDiscentes() {
        const resp = await fetch("http://localhost:3000/api/discentes");
        const data = await resp.json();
        setDiscentes(data);
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleParticipanteChange(id_discente, papel) {
        setForm(prev => {
            const exists = prev.participantes.find(p => p.id_discente === id_discente);
            let participantes;
            if (exists) {
                participantes = prev.participantes.map(p =>
                    p.id_discente === id_discente ? { ...p, papel } : p
                );
            } else {
                participantes = [...prev.participantes, { id_discente, papel }];
            }
            return { ...prev, participantes };
        });
    }

    async function salvar() {
        const { participantes, tipo_atendimento, observacoes, id_mentor_responsavel, ...atividadeData } = form;
        let url, metodo;

        if (form.id_atividade) {
            url = `http://localhost:3000/api/atividades/${form.id_atividade}`;
            metodo = "PUT";
        } else {
            url = "http://localhost:3000/api/atividades";
            metodo = "POST";
        }

        const resp = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(atividadeData)
        });
        const resultado = await resp.json();
        const id_atividade = form.id_atividade || resultado.id;

        // Salvar participantes
        for (let p of participantes) {
            await fetch(`http://localhost:3000/api/atividades/${id_atividade}/participacao`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_discente: p.id_discente, papel: p.papel })
            });
        }

        // Salvar atendimento se for tipo atendimento
        if (atividadeData.tipo === "atendimento") {
            await fetch(`http://localhost:3000/api/atendimentos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    id_atividade,
                    tipo_atendimento, 
                    observacoes, 
                    id_mentor_responsavel
                })
            });
        }

        alert("Atividade salva com sucesso!");
        limparFormulario();
        carregarAtividades();
    }

    function limparFormulario() {
        setForm({
            id_atividade: null,
            titulo: "",
            tipo: "atendimento",
            descricao: "",
            data: "",
            local: "",
            tipo_atendimento: "individual",
            observacoes: "",
            id_mentor_responsavel: "",
            participantes: []
        });
    }

    function editar(atividade) {
        setForm({
            id_atividade: atividade.id_atividade,
            titulo: atividade.titulo,
            tipo: atividade.tipo,
            descricao: atividade.descricao,
            data: atividade.data ? atividade.data.split("T")[0] : "",
            local: atividade.local,
            tipo_atendimento: atividade.tipo_atendimento || "individual",
            observacoes: atividade.observacoes || "",
            id_mentor_responsavel: atividade.id_mentor_responsavel || "",
            participantes: atividade.participantes || []
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function remover(id) {
        if (!confirm("Deseja remover esta atividade?")) return;
        await fetch(`http://localhost:3000/api/atividades/${id}`, { method: "DELETE" });
        carregarAtividades();
    }

    return (
        <div className="op-container">
            <h1>Gerenciamento de Atividades</h1>

            {/* Formulário */}
            <div className="op-form">
                <label>Título:</label>
                <input name="titulo" value={form.titulo} onChange={handleChange} />

                <label>Tipo:</label>
                <select name="tipo" value={form.tipo} onChange={handleChange}>
                    <option value="atendimento">Atendimento</option>
                    <option value="reuniao">Reunião</option>
                    <option value="palestra">Palestra</option>
                    <option value="outro">Outro</option>
                </select>

                <label>Descrição:</label>
                <textarea name="descricao" value={form.descricao} onChange={handleChange} />

                <label>Data:</label>
                <input type="date" name="data" value={form.data} onChange={handleChange} />

                <label>Local:</label>
                <input name="local" value={form.local} onChange={handleChange} />

                {form.tipo === "atendimento" && (
                    <>
                        <label>Tipo de Atendimento:</label>
                        <select name="tipo_atendimento" value={form.tipo_atendimento} onChange={handleChange}>
                            <option value="individual">Individual</option>
                            <option value="coletivo">Coletivo</option>
                        </select>

                        <label>Observações:</label>
                        <textarea name="observacoes" value={form.observacoes} onChange={handleChange} />

                        <label>Mentor Responsável:</label>
                        <select name="id_mentor_responsavel" value={form.id_mentor_responsavel} onChange={handleChange}>
                            <option value="">--Selecione--</option>
                            {discentes.map(d => (
                                <option key={d.id_discente} value={d.id_discente}>{d.nome}</option>
                            ))}
                        </select>
                    </>
                )}

                <h4>Participantes:</h4>
                {discentes.map(d => (
                    <div key={d.id_discente}>
                        <input
                            type="checkbox"
                            checked={!!form.participantes.find(p => p.id_discente === d.id_discente)}
                            onChange={e => handleParticipanteChange(d.id_discente, e.target.checked ? "participante" : "inscrito")}
                        />
                        {d.nome}
                    </div>
                ))}

                <button onClick={salvar}>
                    {form.id_atividade ? "Salvar Edição" : "Adicionar"}
                </button>

                {form.id_atividade && (
                    <button type="button" className="cancelar-btn" onClick={limparFormulario}>
                        Cancelar edição
                    </button>
                )}
            </div>

            {/* Lista */}
            <h2>Atividades Existentes</h2>
            <div className="op-list">
                {atividades.length === 0 && <p>Nenhuma atividade cadastrada.</p>}

                {atividades.map(a => (
                    <div key={a.id_atividade} className="op-card">
                        <div className="op-header">
                            <h3>{a.titulo}</h3>
                            <span className="op-tag">{a.tipo}</span>
                        </div>

                        <p>{a.descricao}</p>
                        <p><b>Data:</b> {a.data?.split("T")[0]} | <b>Local:</b> {a.local}</p>

                        {a.tipo === "atendimento" && (
                            <>
                                <p><b>Tipo de Atendimento:</b> {a.tipo_atendimento}</p>
                                <p><b>Mentor Responsável:</b> {a.mentor_nome}</p>
                                <p><b>Observações:</b> {a.observacoes}</p>
                            </>
                        )}

                        <div className="op-actions">
                            <button onClick={() => editar(a)}>Editar</button>
                            <button onClick={() => remover(a.id_atividade)}>Remover</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
