import { useEffect, useState } from "react";
import MentorCard from "../../components/MentorCard";

export default function GerenciamentoMentores() {
    const [mentores, setMentores] = useState([]);
    const [discentes, setDiscentes] = useState([]);

    const [form, setForm] = useState({
        id_mentor: "",
        area_atuacao: "",
        bio: "",
        disponibilidade: "",
        editando: false
    });

    useEffect(() => {
        carregarMentores();
        carregarDiscentes();
    }, []);

    function carregarMentores() {
        fetch("http://localhost:3000/api/mentores")
            .then((r) => r.json())
            .then((d) => setMentores(d));
    }

    function carregarDiscentes() {
        fetch("http://localhost:3000/api/discentes")
            .then((r) => r.json())
            .then((d) => setDiscentes(d));
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function salvar() {
        const metodo = form.editando ? "PUT" : "POST";
        const url = form.editando
            ? `http://localhost:3000/api/mentores/${form.id_mentor}`
            : "http://localhost:3000/api/mentores";

        fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_mentor: form.id_mentor,
                area_atuacao: form.area_atuacao,
                bio: form.bio,
                disponibilidade: form.disponibilidade
            })
        })
            .then((r) => r.json())
            .then((d) => {
                alert(d.mensagem || "Operação concluída");
                limparFormulario();
                carregarMentores();
            });
    }

    function editar(m) {
        setForm({
            id_mentor: m.id_mentor,
            area_atuacao: m.area_atuacao,
            bio: m.bio,
            disponibilidade: m.disponibilidade,
            editando: true
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function remover(id) {
        if (!confirm("Deseja remover este mentor?")) return;

        fetch(`http://localhost:3000/api/mentores/${id}`, {
            method: "DELETE",
        })
            .then((r) => r.json())
            .then((d) => {
                alert(d.mensagem || "Removido");
                carregarMentores();
            });
    }

    function limparFormulario() {
        setForm({
            id_mentor: "",
            area_atuacao: "",
            bio: "",
            disponibilidade: "",
            editando: false
        });
    }

    return (
        <div className="op-container">
            <h1>Gerenciar Mentores</h1>

            {/* Formulário */}
            <div className="op-form">
                {!form.editando && (
                    <select
                        name="id_mentor"
                        value={form.id_mentor}
                        onChange={handleChange}
                    >
                        <option value="">Selecione um discente</option>
                        {discentes.map((d) => (
                            <option key={d.id_discente} value={d.id_discente}>
                                {d.nome}
                            </option>
                        ))}
                    </select>
                )}

                <input
                    name="area_atuacao"
                    placeholder="Área de atuação"
                    value={form.area_atuacao}
                    onChange={handleChange}
                />

                <textarea
                    name="bio"
                    placeholder="Biografia / Sobre"
                    value={form.bio}
                    onChange={handleChange}
                />

                <textarea
                    name="disponibilidade"
                    placeholder="Disponibilidade"
                    value={form.disponibilidade}
                    onChange={handleChange}
                />

                <button onClick={salvar}>
                    {form.editando ? "Salvar Edição" : "Cadastrar Mentor"}
                </button>

                {form.editando && (
                    <button className="cancelar-btn" onClick={limparFormulario}>
                        Cancelar edição
                    </button>
                )}
            </div>

            {/* LISTA */}
            <h2>Mentores cadastrados</h2>

            <div className="op-list">
                {mentores.length === 0 && <p>Nenhum mentor cadastrado.</p>}

                {mentores.map((m) => (
                    <MentorCard
                        key={m.id_mentor}
                        mentor={m}
                        onEditar={editar}
                        onRemover={remover}
                    />
                ))}
            </div>
        </div>
    );
}
