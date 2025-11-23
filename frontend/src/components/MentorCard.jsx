import "../styles/MentorCard.css";

export default function MentorCard({ mentor, onEditar, onRemover }) {
    return (
        <div className="mentor-card">
            <div className="mentor-header">
                <h3>{mentor.nome_discente}</h3>
                <span className="mentor-tag">Mentor</span>
            </div>

            <p><strong>Área:</strong> {mentor.area_atuacao || "Não informada"}</p>
            <p><strong>Bio:</strong> {mentor.bio || "—"}</p>
            <p><strong>Disponibilidade:</strong> {mentor.disponibilidade || "—"}</p>
            <p><strong>Email:</strong> {mentor.email_discente}</p>

            <div className="mentor-actions">
                <button className="btn-edit" onClick={() => onEditar(mentor)}>
                    Editar
                </button>

                <button className="btn-remove" onClick={() => onRemover(mentor.id_mentor)}>
                    Remover
                </button>
            </div>
        </div>
    );
}
