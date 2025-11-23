import { useEffect, useState } from "react";

export default function CadastroMentor() {
    const [discentes, setDiscentes] = useState([]);
    const [idMentor, setIdMentor] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/discentes")
            .then((r) => r.json())
            .then((d) => setDiscentes(d));
    }, []);

    function enviar() {
        fetch("http://localhost:3000/api/mentores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_mentor: idMentor,
                bio: "",
                disponibilidade: ""
            })
        })
        .then((r) => r.json())
        .then((d) => {
            if (d.error) {
                alert("Erro: " + d.error);
            } else {
                alert("Mentor cadastrado. ID: " + d.id);
            }
        })
        .catch(() => alert("Erro na comunicação com o servidor"));
    }

    return (
        <div>
            <h1>Cadastrar Mentor</h1>

            <select value={idMentor} onChange={(e) => setIdMentor(e.target.value)}>
                <option value="">Selecione um discente</option>

                {discentes.map((d) => (
                    <option key={d.id_discente} value={d.id_discente}>
                        {d.nome}
                    </option>
                ))}
            </select>

            <button onClick={enviar}>Salvar</button>
        </div>
    );
}
