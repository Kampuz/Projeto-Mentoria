import { useEffect, useState } from "react";
import "../../styles/oportunidade/OportunidadeMentor.css"

export default function GerenciamentoOportunidades() {
    const [oportunidades, setOportunidades] = useState([]);
    
    const [form, setForm] = useState({
        id_oportunidade: null,
        tipo: "estagio",
        titulo: "",
        descricao: "",
        requisitos: "",
        data_publicacao: "",
        data_limite: "",
        link: "",
    });

    useEffect(() => {
        carregar();
    }, [])

    function carregar() {
        fetch("http://localhost:3000/api/oportunidades")
        .then(r => r.json())
        .then(d => setOportunidades(d));
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value});
    }

    function salvar() {
        const url = form.id_oportunidade
            ? `http://localhost:3000/api/oportunidades/${form.id_oportunidade}`
            : "http://localhost:3000/api/oportunidades";

        const metodo = form.id_oportunidade ? "PUT" : "POST";


        fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tipo: form.tipo,
                titulo: form.titulo,
                descricao: form.descricao,
                requisitos: form.requisitos,
                data_publicacao: form.data_publicacao,
                data_limite: form.data_limite,
                link: form.link
            })
        })
        .then((r) => r.json())
        .then((d) => {
            alert(d.message || "Operação concluída");
            limparFormulario();
            carregar();
        });
    }

    function editar(op) {

        const formatar = (d) => d ? d.split("T")[0] : "";

        setForm({
            id_oportunidade: op.id_oportunidade,
            tipo: op.tipo,
            titulo: op.titulo,
            descricao: op.descricao,
            requisitos: op.requisitos,
            data_publicacao: formatar(op.data_publicacao),
            data_limite: formatar(op.data_limite),
            link: op.link
        });

        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    function remover(id) {
        if (!confirm("Deseja remover esta oportunidade?")) return;

        fetch(`http://localhost:3000/api/oportunidades/${id}`, {
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
            id_oportunidade: null,
            tipo: "estagio",
            titulo: "",
            descricao: "",
            requisitos: "",
            data_publicacao: "",
            data_limite: "",
            link: ""   
        });
    }

    return (
        <div className="op-container">
            <h1>Gerenciar Oportunidades</h1>

            {/* Formulário */}
            <div className="op-form">
                <label>Tipo de oportunidade:</label>
                <select name="tipo" value={form.tipo} onChange={handleChange}>
                    <option value="estagio">Estágio</option>
                    <option value="bolsa">Bolsa</option>
                    <option value="outro">Outro</option>
                </select>

                <label>Título</label>
                <input name="titulo" value={form.titulo} onChange={handleChange} />

                <label>Descrição:</label>
                <textarea name="descricao" value={form.descricao} onChange={handleChange} />

                <label>Requisitos:</label>
                <textarea name="requisitos" value={form.requisitos} onChange={handleChange} />

                <label>Data de Publicação:</label>
                <input type="date" name="data_publicacao" value={form.data_publicacao} onChange={handleChange} />

                <label>Data Limite:</label>
                <input type="date" name="data_limite" value={form.data_limite} onChange={handleChange} />

                <label>Link para publicação:</label>
                <input name="link" value={form.link} onChange={handleChange} />

                <button onClick={salvar}>
                    {form.id_oportunidade ? "Salvar Edição" : "Adicionar"}
                </button>

                {form.id_oportunidade && (
                    <button type="button" className="cancelar-btn" onClick={limparFormulario}>
                        Cancelar edição
                    </button>
                )}
            </div>

            {/* Lista */}
            <h2>Oportunidades existentes</h2>

            <div className="op-list">
                {oportunidades.length === 0 && <p>Nenhuma oportunidade cadastrada.</p>}

                {oportunidades.map(op => (
                    <div key={op.id_oportunidade} className="op-card">
                        <div className="op-header">
                            <h3>{op.titulo}</h3>
                            <span className="op-tag">{op.tipo}</span>
                        </div>

                        <p className="op-desc">{op.descricao}</p>

                        {op.requisitos && (
                            <p className="op-req"><strong>Requisitos:</strong> {op.requisitos}</p>
                        )}

                        <div className="op-datas">
                            <p><strong>Publicação:</strong> {op.data_publicacao}</p>
                            <p><strong>Data Limite:</strong> {op.data_limite}</p>
                        </div>

                        {op.link && (
                            <a className="op-link" href={op.link} target="_blank">
                                Acessar oportunidade
                            </a>
                        )}

                        <div className="op-actions">
                            <button className="btn-edit" onClick={() => editar(op)}>Editar</button>
                            <button className="btn-remove" onClick={() => remover(op.id_oportunidade)}>Remover</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}