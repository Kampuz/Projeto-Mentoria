import { useEffect, useState } from "react";

export default function CadastroOportunidade() {
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
        setForm({
            id_oportunidade: op.id_oportunidade,
            tipo: op.tipo,
            titulo: op.titulo,
            descricao: op.descricao,
            requisitos: op.requisitos,
            data_publicacao: op.data_publicacao,
            data_limite: op.data_limite,
            link: op.link
        });
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
        <div style={{ padding: "20px" }}>
            <h1>Gerenciar Oportunidades</h1>

            {/* Formulário */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "300px",
                    gap: "10px",
                    marginBottom: "30px"
                }}
            >
                <select name="tipo" value={form.tipo} onChange={handleChange}>
                    <option value="estagio">Estágio</option>
                    <option value="bolsa">Bolsa</option>
                    <option value="outro">Outro</option>
                </select>

                <input
                    name="titulo"
                    placeholder="Título"
                    value={form.titulo}
                    onChange={handleChange}
                />

                <textarea
                    name="descricao"
                    placeholder="Descrição"
                    value={form.descricao}
                    onChange={handleChange}
                />

                <textarea
                    name="requisitos"
                    placeholder="Requisitos"
                    value={form.requisitos}
                    onChange={handleChange}
                />

                <label>Data de Publicação:</label>
                <input
                    type="date"
                    name="data_publicacao"
                    value={form.data_publicacao}
                    onChange={handleChange}
                />

                <label>Data Limite:</label>
                <input
                    type="date"
                    name="data_limite"
                    value={form.data_limite}
                    onChange={handleChange}
                />

                <input
                    name="link"
                    placeholder="Link"
                    value={form.link}
                    onChange={handleChange}
                />

                <button onClick={salvar}>
                    {form.id_oportunidade ? "Salvar Edição" : "Adicionar"}
                </button>

                {form.id_oportunidade && (
                    <button type="button" onClick={limparFormulario}>
                        Cancelar edição
                    </button>
                )}
            </div>

            {/* Lista */}
            <h2>Oportunidades existentes</h2>

            {oportunidades.length === 0 && <p>Nenhuma oportunidade cadastrada.</p>}

            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {oportunidades.map((op) => (
                    <li
                        key={op.id_oportunidade}
                        style={{
                            border: "1px solid #ccc",
                            padding: "12px",
                            borderRadius: "8px"
                        }}
                    >
                        <strong>{op.titulo}</strong> - {op.tipo}
                        <p>{op.descricao}</p>

                        {op.requisitos && <p><strong>Requisitos:</strong> {op.requisitos}</p>}

                        <p>Publicação: {op.data_publicacao}</p>
                        <p>Data limite: {op.data_limite}</p>

                        {op.link && (
                            <a href={op.link} target="_blank">
                                Link da oportunidade
                            </a>
                        )}

                        <br />

                        <button onClick={() => editar(op)}>Editar</button>
                        <button
                            onClick={() => remover(op.id_oportunidade)}
                            style={{ marginLeft: "10px" }}
                        >
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}