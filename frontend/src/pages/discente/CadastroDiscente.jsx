import { useEffect, useState } from "react";

export default function GerenciarDiscentes() {
    const [discentes, setDiscentes] = useState([]);
    const [form, setForm] = useState({
        id_discente: null,
        nome: "",
        email: "",
        curso: "",
        periodo: "",
        editando: false
    });

    useEffect(() => {
        carregar();
    }, []);

    function carregar() {
        fetch("http://localhost:3000/api/discentes")
            .then((r) => r.json())
            .then((d) => setDiscentes(d));
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function salvar() {
        const url = form.editando
            ? `http://localhost:3000/api/discentes/${form.id_discente}`
            : "http://localhost:3000/api/discentes";

        const metodo = form.editando ? "PUT" : "POST";

        fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: form.nome,
                email: form.email,
                curso: form.curso,
                periodo: form.periodo
            })
        })
        .then((r) => r.json())
        .then((d) => {
            alert(d.mensagem || "Operação concluída");
            limparFormulario();
            carregar();
        });
    }

    function editar(d) {
        setForm({
            id_discente: d.id_discente,
            nome: d.nome,
            email: d.email,
            curso: d.curso,
            periodo: d.periodo,
            editando: true
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function remover(id) {
        if (!confirm("Deseja remover este discente?")) return;

        fetch(`http://localhost:3000/api/discentes/${id}`, { method: "DELETE" })
            .then((r) => r.json())
            .then((d) => {
                alert(d.mensagem || "Removido");
                carregar();
            });
    }

    function promover(id) {
        fetch("http://localhost:3000/api/mentores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_mentor: id,
                area_atuacao: "",
                bio: "",
                disponibilidade: ""
            })
        })
        .then((r) => r.json())
        .then((d) => {
            alert(d.mensagem || "Discente promovido a mentor");
            carregar();
        });
    }

    function limparFormulario() {
        setForm({
            id_discente: null,
            nome: "",
            email: "",
            curso: "",
            periodo: "",
            editando: false
        });
    }

    return (
        <div className="op-container">
            <h1>Gerenciar Discentes</h1>

            {/* Formulário */}
            <div className="op-form">
                <input
                    name="nome"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    name="curso"
                    placeholder="Curso"
                    value={form.curso}
                    onChange={handleChange}
                />
                <input
                    name="periodo"
                    placeholder="Período"
                    value={form.periodo}
                    onChange={handleChange}
                />

                <button onClick={salvar}>
                    {form.editando ? "Salvar Edição" : "Cadastrar"}
                </button>

                {form.editando && (
                    <button className="cancelar-btn" onClick={limparFormulario}>
                        Cancelar edição
                    </button>
                )}
            </div>

            {/* Lista */}
            <h2>Discentes cadastrados</h2>

            <div className="op-list">
                {discentes.length === 0 && <p>Nenhum discente cadastrado.</p>}

                {discentes.map((d) => (
                    <div key={d.id_discente} className="op-card">
                        <div className="op-header">
                            <h3>{d.nome}</h3>

                            {d.ehMentor ? (
                                <span className="op-tag mentor">Mentor</span>
                            ) : (
                                <span className="op-tag aluno">Aluno</span>
                            )}
                        </div>

                        <p><strong>Email:</strong> {d.email}</p>
                        <p><strong>Curso:</strong> {d.curso}</p>
                        <p><strong>Período:</strong> {d.periodo}</p>

                        <div className="op-actions">
                            <button className="btn-edit" onClick={() => editar(d)}>
                                Editar
                            </button>

                            <button className="btn-remove" onClick={() => remover(d.id_discente)}>
                                Remover
                            </button>

                            {!d.ehMentor && (
                                <button className="btn-mentor" onClick={() => promover(d.id_discente)}>
                                    Promover a Mentor
                                </button>
                            )}

                            {d.ehMentor && (
                                <a href="/mentores" className="btn-link">
                                    Editar Mentor
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
