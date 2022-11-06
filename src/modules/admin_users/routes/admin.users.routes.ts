import Router from "express";
import AdminUsersController from "../controllers/AdminUsersController";

const adminUsersRouter = Router();
const adminUsersController = new AdminUsersController();

adminUsersRouter.post("/", adminUsersController.create);
adminUsersRouter.get("/users", adminUsersController.indexUsers);
adminUsersRouter.get("/vehicles", adminUsersController.indexVehicles);
adminUsersRouter.delete("/vehicle/:id", adminUsersController.deleteVehicle);

export default adminUsersRouter;
