import { Link } from "react-router-dom"
import "../../styles/HomeMentor.css"

export default function Home() {
    return (
        <div className="container">
            <Link className="link-btn" to="/mentores">
                Mentores
            </Link>
            <br/>
            <Link className="link-btn" to="/atividades">
                Atividades
            </Link>
            <br/>
            <Link className="link-btn" to="/eventos">
                Eventos
            </Link>
            <br/>
            <Link className="link-btn" to="/oportunidades">
                Oportunidades
            </Link>
        </div>
    );
}