import Router from "express";
import multer from "multer";
import checkIdInToken from "../../../shared/http/middlewares/checkIdInToken";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import VehicleAvatarController from "../controllers/VehicleAvatarController";
import VehiclesController from "../controllers/VehiclesController";

const vehiclesRouter = Router();
const vehiclesController = new VehiclesController();
const vehicleAvatarController = new VehicleAvatarController();

const uploadVehicleAvatar = multer({
    storage: multer.memoryStorage(),
});

vehiclesRouter.post("/", isAuthenticated, vehiclesController.create);
vehiclesRouter.get(
    "/:id",
    isAuthenticated,
    checkIdInToken,
    vehiclesController.show,
);
vehiclesRouter.put(
    "/:id",
    isAuthenticated,
    checkIdInToken,
    vehiclesController.update,
);

vehiclesRouter.post("/:id", isAuthenticated, vehiclesController.delete);
vehiclesRouter.get("/", vehiclesController.allVehicles);

vehiclesRouter.patch(
    "/avatar/:id",
    isAuthenticated,
    uploadVehicleAvatar.single("vehicleAvatarFileName"),
    vehicleAvatarController.update,
);

export default vehiclesRouter;
