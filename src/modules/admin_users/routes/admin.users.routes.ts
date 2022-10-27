import Router from "express";
import AdminUsersController from "../controllers/AdminUsersController";

const adminUsersRouter = Router();
const adminUsersController = new AdminUsersController();

adminUsersRouter.post("/", adminUsersController.create);
adminUsersRouter.get("/", adminUsersController.index);

export default adminUsersRouter;
