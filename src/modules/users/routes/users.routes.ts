import Router from "express";
import multer from "multer";
import checkIdInToken from "../../../shared/http/middlewares/checkIdInToken";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import UserAvatarController from "../controllers/UserAvatarController";
import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const uploadUserAvatar = multer({
    storage: multer.memoryStorage(),
});

usersRouter.post("/", usersController.create);

usersRouter.put(
    "/:id",
    isAuthenticated,
    checkIdInToken,
    usersController.update,
);

usersRouter.get("/:id", isAuthenticated, checkIdInToken, usersController.show);

usersRouter.patch(
    "/avatar",
    isAuthenticated,
    uploadUserAvatar.single("avatarFilename"),
    userAvatarController.update,
);

usersRouter.get(
    "/publications/:id",
    isAuthenticated,
    usersController.indexPublications,
);

export default usersRouter;
