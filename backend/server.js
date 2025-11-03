import express from "express";
import cors from "cors";
import mentoresRoutes from "./routes/mentores.js";
import perguntasRoutes from "./routes/perguntas.js";
import alunosRoutes from "./routes/alunos.js";
import respostasRoutes from "./routes/respostas.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/mentores", mentoresRoutes);
app.use("/api/perguntas", perguntasRoutes);
app.use("/api/alunos", alunosRoutes);
app.use("/api/respostas", respostasRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
