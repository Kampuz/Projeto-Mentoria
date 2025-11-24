import { Link } from "react-router-dom"
import "../../styles/HomeMentor.css"

export default function HomeMentor() {
    return (
        <div className="container">
            <Link className="link-btn" to="/discentes">
                Gerenciar discentes
            </Link>
            <br/>
            <Link className="link-btn" to="/gerenciamento-atividades">
                Gerenciar atividade
            </Link>
            <br/>
            <Link className="link-btn" to="/gerenciamento-disciplinas">
                Gerenciamento disciplinas
            </Link>
            <br/>
            <Link className="link-btn" to="/gerenciamento-oportunidades">
                Gerenciar oportunidades
            </Link>
            <br />
            <Link className="link-btn" to="/perfil">
                Perfil
            </Link>
        </div>
    );
}