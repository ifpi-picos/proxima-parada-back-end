import express from "express";
import routes from "./routes";
import cors from "cors";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.get("/api", (request, response) => {
    response
        .status(200)
        .send('<h1 style="texte-align: center">Api Próxima Parada Online</h1>');
});

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port);
});
