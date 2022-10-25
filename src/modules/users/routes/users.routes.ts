import Router from "express";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/", usersController.create);

usersRouter.put("/:id", isAuthenticated, usersController.update);

usersRouter.get("/:id", isAuthenticated, usersController.show);

export default usersRouter;
