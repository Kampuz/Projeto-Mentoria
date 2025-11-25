import { useEffect, useState } from "react";
import "../../styles/atividade/AtividadeMentor.css"

export default function Atividades() {
    const [atividades, setAtividades]   = useState([]);
    
    const [form, setForm] = useState({
        id_atividade: null,
        tipo: "atendimento",
        descricao: "",
        local: "",
        data: ""
    });

    useEffect(() => {
        carregar();
    }, [])

    function carregar() {
        fetch("http://localhost:3000/api/atividades")
        .then(r => r.json())
        .then(d => setAtividades(d));
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value});
    }

    function salvar() {
        let url;
        let metodo;

        if (form.id_atividade) {
            url = `http://localhost:3000/api/atividades/${form.id_atividade}`
            metodo = "PUT"
        } else {
            url = "http://localhost:3000/api/atividades";
            metodo = "POST"
        }

        fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tipo: form.tipo,
                descricao: form.descricao,
                local: form.local,
                data: form.data
            })
        })
        .then((r) => r.json())
        .then((d) => {
            alert(d.message || "Operação concluída");
            limparFormulario();
            carregar();
        });
    }

    function editar(a) {

        setForm({
            id_atividade: a.id_atividade,
            tipo: a.tipo,
            descricao: a.descricao,
            local: a.local,
            data: a.data,
        });

        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    function remover(id) {
        if (!confirm("Deseja remover esta oportunidade?")) return;

        fetch(`http://localhost:3000/api/atividades/${id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(d => {
            alert(d.message || "Removido");
            carregar();
        });
    }

    function limparFormulario() {
        setForm({
            id_atividade: null,
            tipo: "atendimento",
            descricao: "",
            local: "",
            data: ""
        });
    }

    return (
        <div className="op-container">
            <h1>Gerenciar Atividades</h1>

            {/* Formulário */}
            <div className="op-form">
                <label>Tipo de atividade:</label>
                <select name="tipo" value={form.tipo} onChange={handleChange}>
                    <option value="atendimento">Atendimento</option>
                    <option value="reuniao">Reunião</option>
                    <option value="palestra">Palestra</option>
                    <option value="outro">Outro</option>
                </select>

                <label>Descrição:</label>
                <textarea name="descricao" value={form.descricao} onChange={handleChange} />

                <label>Local:</label>
                <textarea name="local" value={form.local} onChange={handleChange} />

                <label>Data:</label>
                <input type="date" name="data" value={new Date(form.data).toLocaleDateString("pt-BR")} onChange={handleChange} />

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
            <h2>Atividades cadastradas</h2>

            <div className="op-list">
                {atividades.length === 0 && <p>Nenhuma atividade cadastrada.</p>}

                {atividades.map(a => (
                    <div key={a.id_atividade} className="op-card">
                        <div className="op-header">
                            <h3>{a.tipo}</h3>
                            <span className="op-tag">{a.tipo}</span>
                        </div>

                        <p className="op-desc">{a.descricao}</p>

                        <p><strong>Local:</strong> {a.local}</p>
                        <p><strong>Data:</strong> {new Date(a.data).toLocaleDateString("pt-BR")}</p>

                        <div className="op-actions">
                            <button className="btn-edit" onClick={() => editar(a)}>Editar</button>
                            <button className="btn-remove" onClick={() => remover(a.id_atividade)}>Remover</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}