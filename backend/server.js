import express from "express";
import cors from "cors";


import oportunidadesRoutes from "./routes/oportunidades.js"
import mentoresRoutes from "./routes/mentores.js"
import discentesRoutes from "./routes/discentes.js"


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/oportunidades", oportunidadesRoutes);
app.use("/api/mentores", mentoresRoutes);
app.use("/api/discentes", discentesRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});