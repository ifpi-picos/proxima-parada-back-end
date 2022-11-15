import Router from "express";
import AdminUsersController from "../controllers/AdminUsersController";

const adminUsersRouter = Router();
const adminUsersController = new AdminUsersController();

adminUsersRouter.post("/", adminUsersController.create);
adminUsersRouter.get("/users", adminUsersController.indexUsers);
adminUsersRouter.get("/admins", adminUsersController.indexAdmins);
adminUsersRouter.get("/vehicles", adminUsersController.indexVehicles);
adminUsersRouter.get("/statusRequest", adminUsersController.indexStatusRequest);
adminUsersRouter.delete("/vehicle/:id", adminUsersController.deleteVehicle);
adminUsersRouter.put(
    "/statusRequest/:id",
    adminUsersController.updateStatusRequest,
);

export default adminUsersRouter;
