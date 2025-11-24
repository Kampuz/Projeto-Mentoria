import "../styles/discente/DiscenteCard.css"
export default function DiscenteCard({ discente, onEditar, onRemover, onPromover, onRebaixar }) {
    return (
        <div className="disc-card">
            <div className="disc-header">
                <h3>{discente.nome}</h3>

                {discente.e_mentor === 1 ? (
                    <span className="disc-tag mentor">Mentor</span>
                ) : (
                    <span className="disc-tag aluno">Aluno</span>
                )}
            </div>

            <p><strong>Email:</strong> {discente.email}</p>
            <p><strong>Matricula:</strong> {discente.matricula}</p>
            <p><strong>Período:</strong> {discente.periodo}</p>

            <div className="disc-actions">
                <button className="btn-edit" onClick={() => onEditar(discente)}>
                    Editar
                </button>

                <button className="btn-remove" onClick={() => onRemover(discente.id_discente)}>
                    Remover
                </button>

                {discente.e_mentor !== 1 && (
                    <button
                        className="btn-mentor"
                        onClick={() => onPromover(discente.id_discente)}
                    >
                        Promover a Mentor
                    </button>
                )}

                {discente.e_mentor === 1 && (
                    <>
                        <span className="tag-mentor">Mentor</span>

                        <button
                            className="btn-rebaixar"
                            onClick={() => onRebaixar(discente.id_discente)}
                        >
                            Desvincular
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
