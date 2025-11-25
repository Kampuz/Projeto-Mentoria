import { useEffect, useState } from "react";
import "../../styles/atividade/AtividadeMentor.css"

export default function Atividades() {
    const [atividades, setAtividades]   = useState([]);

    useEffect(() => {
        carregar();
    }, [])

    function carregar() {
        fetch("http://localhost:3000/api/atividades")
        .then(r => r.json())
        .then(d => setAtividades(d));
    }

    return (
        <div className="op-container">
            <h1>Atividades</h1>

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
                    </div>
                ))}
            </div>
        </div>
    );
}