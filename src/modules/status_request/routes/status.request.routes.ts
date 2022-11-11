import { Router } from "express";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import StatusRequestsController from "../controllers/StatusRequestsController";

const statusRequestsRouter = Router();
const statusRequestsController = new StatusRequestsController();

statusRequestsRouter.post(
    "/:id_user",
    isAuthenticated,
    statusRequestsController.create,
);

export default statusRequestsRouter;
