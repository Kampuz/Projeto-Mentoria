import { useEffect, useState } from "react";
import "../../styles/discente/Discentes.css";
import DiscenteCard from "../../components/DiscenteCard";

export default function GerenciarDiscentes() {
    const [discentes, setDiscentes] = useState([]);
    const [form, setForm] = useState({
        id_discente: null,
        nome: "",
        email: "",
        matricula: "",
        periodo: "",
        editando: false
    });

    useEffect(() => { carregar(); }, []);

    async function carregar() {
        fetch("http://localhost:3000/api/discentes")
            .then((r) => r.json())
            .then((d) => setDiscentes(d));
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function salvar() {

        let url;
        let metodo;
        
        if (form.editando) {
            url = `http://localhost:3000/api/discentes/${form.id_discente}`;
            metodo = "PUT";
        } else {
            url = "http://localhost:3000/api/discentes";
            metodo = "POST";
        }

        await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: form.nome,
                email: form.email,
                matricula: form.matricula,
                periodo: form.periodo
            })
        })
        .then((r) => r.json())
        .then((d) => {
            alert(d.mensagem || "disceração concluída");
            limparFormulario();
            carregar();
        });
    }

    function editar(d) {
        setForm({
            id_discente: d.id_discente,
            nome: d.nome,
            email: d.email,
            matricula: d.matricula,
            periodo: d.periodo,
            editando: true
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function remover(id) {
        if (!confirm("Deseja remover este discente?")) return;

        await fetch(`http://localhost:3000/api/discentes/${id}`, { 
            method: "DELETE"
        })
            .then((r) => r.json())
            .then((d) => {
                alert(d.mensagem || "Removido");
                carregar();
            });
    }

    async function promover(id) {
        if (!confirm("Deseja promover este discente à mentor?")) return;

        await fetch(`http://localhost:3000/api/discentes/${id}/promover`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });
        carregar();
    }

    async function rebaixar(id) {
        if (!confirm("Deseja remover o status de mentor deste discente?")) return;

        await fetch(`http://localhost:3000/api/discentes/${id}/desvincular`, {
            method: "DELETE"
        });
        await carregar();
    }

    function limparFormulario() {
        setForm({
            id_discente: null,
            nome: "",
            email: "",
            matricula: "",
            periodo: "",
            editando: false
        });
    }

    return (
        <div className="dic-container">
            <h1>Gerenciar Discentes</h1>

            {/* Formulário */}
            <div className="disc-form">
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
                    name="matricula"
                    placeholder="Matricula"
                    value={form.matricula}
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

            <div className="disc-list">
                {discentes.length === 0 && <p>Nenhum discente cadastrado.</p>}

                {discentes.map((d) => (
                    <DiscenteCard
                        key={d.id_discente}
                        discente={d}
                        onEditar={editar}
                        onRemover={remover}
                        onPromover={promover}
                        onRebaixar={rebaixar}
                    />
                ))}
            </div>
        </div>
    );
}
