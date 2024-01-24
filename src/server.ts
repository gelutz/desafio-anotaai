import cors from "cors";
import "dotenv/config";
import express from "express";
import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server iniciado na porta ${port}`);
});
