import { useEffect, useState } from "react";
import OportunidadeCard from "../../components/OportunidadeCard";

export default function ListaOportunidades() {
    const [oportunidades, setOportunidades] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/oportunidades")
            .then((r) => r.json())
            .then((d) => setOportunidades(d));
    }, []);

    return (
        <div>
            <h1>Oportunidades</h1>

            {oportunidades.length === 0 && <p>Nenhuma oportunidade disponível.</p>}

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "20px"
            }}>
                {oportunidades.map(op => (
                    <OportunidadeCard
                        key={op.id_oportunidade}
                ))}
            </div>
        </div>
    );
}
