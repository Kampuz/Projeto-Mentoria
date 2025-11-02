export default function MentorList({ mentores }) {
    return (
        <ul>
            {mentores.map(m => (
                <li key={m.id}>{m.nome} - {m.area} - {m.email}</li>
            ))}
        </ul>
    );
}