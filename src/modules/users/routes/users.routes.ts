import Router from "express";
import checkIdInToken from "../../../shared/http/middlewares/checkIdInToken";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/", usersController.create);

usersRouter.put(
    "/:id",
    isAuthenticated,
    checkIdInToken,
    usersController.update,
);

usersRouter.get("/:id", isAuthenticated, checkIdInToken, usersController.show);

export default usersRouter;
