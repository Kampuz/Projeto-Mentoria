import { Link } from "react-router-dom"
import "../../styles/HomeMentor.css"

export default function HomeMentor() {
    return (
        <div className="container">
            <Link className="link-btn" to="/cadastro-discente">
                Cadastrar discente
            </Link>
            <br/>
            <Link className="link-btn" to="/cadastro-mentor">
                Cadastrar mentor
            </Link>
            <br/>
            <Link className="link-btn" to="/cadastro-atividade">
                Cadastrar atividade
            </Link>
            <br/>
            <Link className="link-btn" to="/cadastro-bolsa">
                Cadastrar bolsa
            </Link>
            <br/>
            <Link className="link-btn" to="/cadastro-evento">
                Cadastrar evento
            </Link>
            <br/>
            <Link className="link-btn" to="/cadastro-oportunidade">
                Cadastrar oportunidade
            </Link>
        </div>
    );
}