import Router from "express";
import checkIdInToken from "../../../shared/http/middlewares/checkIdInToken";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import PublicationsController from "../controllers/PublicationsController";

const publicationRouter = Router();
const publicationsController = new PublicationsController();

publicationRouter.post("/", isAuthenticated, publicationsController.create);
publicationRouter.get(
    "/",
    isAuthenticated,
    publicationsController.indexPublications,
);
publicationRouter.get("/:id", publicationsController.show);

export default publicationRouter;
