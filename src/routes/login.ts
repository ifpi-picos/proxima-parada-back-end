import { Router, Request, Response } from "express";

const routers = Router();

routers.get("/", (req: Request, res: Response) => {
  res.json({ login: "Tela de login padrão!!" });
});

routers.post("/", (req: Request, res: Response) => {
  res.json({ login: "Logado com sucesso!!!" });
});

export default routers;

