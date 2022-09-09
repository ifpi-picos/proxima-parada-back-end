import express from "express";
import routers from "./routes";

const app = express();

app.use("/", routers);

/* app.get("/", (req, res)=>{
    res.end("testes");
}) */

app.listen(3000, () => {
  console.log("Servidor rodando");
});
