import { Router, Request, Response } from "express";

const routers = Router();

routers.get("/", (req: Request, res: Response) => {
  res.json({ caronas: "Lista de todas as caronas!!!!" });
});

export default routers;
