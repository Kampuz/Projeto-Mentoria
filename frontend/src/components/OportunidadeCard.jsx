import { Link } from "react-router-dom";
import "../styles/OportunidadeCard.css"


export default function OportunidadeCard({
    id,
    titulo,
    tipo,
    descricao,
    data_limite
}) {
    return (
        <div className="op-card">
            <h2>{titulo}</h2>

            <span className={`op-tipo tipo-${tipo}`}>
                {tipo.toUpperCase()}
            </span>

            <p className="op-descricao">
                {descricao.length > 120
                    ? descricao.substring(0, 120) + "..."
                    : descricao}
            </p>

            <p className="op-data">
                Data limite: {data_limite || "Não informado"}
            </p>

            <Link to={`/oportunidade/${id}`} className="op-btn">
                    Ver detalhes
            </Link>
        </div>
    );
}