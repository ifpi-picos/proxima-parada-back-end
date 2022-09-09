import { Router, Request, Response } from "express";

const routers = Router();

routers.get("/", (req: Request, res: Response) => {
  res.json({ profile: "Todas as informacoes de usuario!!" });
});

routers.post("/", (req: Request, res: Response) => {
  res.json({ profile: "Informações de usuário altrados com sucesso!!!" });
});

export default routers;
