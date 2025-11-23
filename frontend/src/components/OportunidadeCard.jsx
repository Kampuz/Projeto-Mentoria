import { useState } from "react";
import "../styles/oportunidade/OportunidadeCard.css";

export default function OportunidadeCard({
    id,
    titulo,
    tipo,
    descricao,
    requisitos,
    data_publicacao,
    data_limite,
    link
}) {
    const [mensagem, setMensagem] = useState("");

    async function inscrever() {
        const resposta = await fetch(`http://localhost:3000/api/oportunidades/${id}/inscrever`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id_discente: 1})
        });
        
        const data = await resposta.json();
        setMensagem(data.mensagem);
    }

    return (
        <div className="op-card">
            <h2 className="op-titulo">{titulo}</h2>

            <span className={`op-tipo tipo-${tipo}`}>
                {tipo.toUpperCase()}
            </span>

            <p className="op-requisitos">
                {requisitos}
            </p>

            <p className="op-descricao">
                {descricao}
            </p>

            <p className="op-data">
                Data publicacao: <b>{data_publicacao || "Não informado"}</b>
            </p>

            <p className="op-data">
                Data limite: <b>{data_limite || "Não informado"}</b>
            </p>

            <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
            </a>

            <button className="inscrever-btn" onClick={inscrever}>
                Inscrever-se
            </button>

            {mensagem && <p className="mensagem-retorno">{mensagem}</p>}
        </div>
    );
}
