import { Router, Request, Response } from "express";

const routers = Router();

routers.get("/alunos", (req: Request, res: Response) => {
  res.json({ alunos: "lista de alunos" });
  res.end();
});

routers.post("/alunos", (req: Request, res: Response) => {
  res.json({ aluno: "aluno adicionado" });
  res.end();
});

export default routers;