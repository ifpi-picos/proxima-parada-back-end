import Router from "express";
import checkIdInToken from "../../../shared/http/middlewares/checkIdInToken";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import VehiclesController from "../controllers/VehiclesController";

const vehiclesRouter = Router();
const vehiclesController = new VehiclesController();

vehiclesRouter.post("/", isAuthenticated, vehiclesController.create);
vehiclesRouter.get(
    "/:id",
    isAuthenticated,
    checkIdInToken,
    vehiclesController.show,
);

export default vehiclesRouter;
