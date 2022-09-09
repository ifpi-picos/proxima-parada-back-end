import { Router } from "express";
import rotasAluno from "./alunos"
const routers = Router();


routers.use("/anulos", rotasAluno)

export default routers;