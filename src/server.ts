import cors from "cors";
import express from "express";
import { env } from "./config/Environment";
import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
// app.use(errorHandler);

app.listen(env.servicePort, () => {
    console.log(`Server iniciado na porta ${env.servicePort}`);
});
