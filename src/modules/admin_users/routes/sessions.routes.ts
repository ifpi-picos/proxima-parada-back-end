import { Router } from "express";
import SessionsAdminController from "../controllers/SessionsAdminController";

const sessionsAdminRouter = Router();
const sessionsAdminController = new SessionsAdminController();

sessionsAdminRouter.post("/", sessionsAdminController.create);

export default sessionsAdminRouter;
