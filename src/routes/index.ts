import { Router, Request, Response} from "express";
import rotasAluno from "./alunos";
const routers = Router();

routers.get("/", (req: Request, res: Response) => {
    res.send("Ola!");
});

routers.use("/alunos", rotasAluno);

export default routers;
