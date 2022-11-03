import Router from "express";
import checkIdInToken from "../../../shared/http/middlewares/checkIdInToken";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/", usersController.create);

usersRouter.put("/", isAuthenticated, checkIdInToken, usersController.update);

usersRouter.get("/", isAuthenticated, checkIdInToken, usersController.show);

export default usersRouter;
