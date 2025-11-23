import { useState } from "react";
import { getUser } from "../../auth/session";


export default function CadastroOportunidade() {
    const [form, setForm] = useState({
        titulo: "",
        descricao: ""
    });

    const user = getUser();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value});
    }

    function enviar() {
        fetch("http://localhost:3000/api/oportunidades", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(form)
        })
        .then((r) => r.json())
        .then((d) => {
            if (d.error) alert(d.error);
            else alert("Criado id: " + d.id);
        });
    }

    if (user?.tipo !== "mentor")
        return <p>Acesso negado</p>

    return (
        <div>
            <h1>Nova Oportunidade</h1>

            <input
                name="titulo"
                placeholder="Título"
                value={form.descricao}
                onChange={handleChange}
            />

            <textarea
                name="descricao"
                placeholder="Descrição"
                value={form.descricao}
                onChange={handleChange}
            />

            <button onClick={enviar}>Salvar</button>
        </div>
    );
}