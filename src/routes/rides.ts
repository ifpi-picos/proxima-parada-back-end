import { Router, Request, Response } from "express";

const routers = Router();

routers.get("/", (req: Request, res: Response) => {
  res.json({ profile: "Lista de caronas criadas pelo usuario!!" });
});

routers.post("/", (req: Request, res: Response) => {
    res.json({ profile: "Nova carona criada com sucesso!!!"  });
  });

export default routers;
