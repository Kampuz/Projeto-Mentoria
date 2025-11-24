import { Link } from "react-router-dom"
import "../../styles/HomeMentor.css"

export default function HomeMentor() {
    return (
        <div className="container">
            <Link className="link-btn" to="/discentes">
                Discentes
            </Link>
            <br/>
            <Link className="link-btn" to="/mentores">
                Lista de Mentores
            </Link>
            <Link className="link-btn" to="/cadastro-mentor">
                Cadastrar mentor
            </Link>
            <br/>
            <Link className="link-btn" to="/gerenciamento-atividades">
                Cadastrar atividade
            </Link>
            <br/>
            <Link className="link-btn" to="/cadastro-evento">
                Cadastrar evento
            </Link>
            <br/>
            <Link className="link-btn" to="/gerenciamento-oportunidades">
                Oportunidades
            </Link>
        </div>
    );
}