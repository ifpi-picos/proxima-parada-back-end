import Router from "express";
import AdminUsersController from "../controllers/AdminUsersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const adminUsersRouter = Router();
const adminUsersController = new AdminUsersController();

adminUsersRouter.post("/", adminUsersController.create);
adminUsersRouter.get(
    "/users",
    isAuthenticated,
    adminUsersController.indexUsers,
);
adminUsersRouter.get(
    "/admins",
    isAuthenticated,
    adminUsersController.indexAdmins,
);
adminUsersRouter.get(
    "/vehicles",
    isAuthenticated,
    adminUsersController.indexVehicles,
);
adminUsersRouter.get(
    "/statusRequest",
    isAuthenticated,
    adminUsersController.indexStatusRequest,
);
adminUsersRouter.delete(
    "/vehicle/:id",
    isAuthenticated,
    adminUsersController.deleteVehicle,
);
adminUsersRouter.put(
    "/statusRequest/:id",
    isAuthenticated,
    adminUsersController.updateStatusRequest,
);

adminUsersRouter.get(
    "/statistics",
    isAuthenticated,
    adminUsersController.countNumberUsers,
);

export default adminUsersRouter;
