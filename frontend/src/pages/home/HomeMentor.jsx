import { Link } from "react-router-dom"
import "../../styles/HomeMentor.css"

export default function HomeMentor() {
    return (
        <div className="container">
            <Link className="link-btn" to="/discentes">
                Discentes
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
            <br />
            <Link className="link-btn" to="/perfil">
                Perfil
            </Link>
        </div>
    );
}