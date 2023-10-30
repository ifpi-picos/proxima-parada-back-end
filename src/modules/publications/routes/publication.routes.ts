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
publicationRouter.get("/:id", isAuthenticated, publicationsController.show);

publicationRouter.put(
    "/update/:id_user",
    isAuthenticated,
    publicationsController.update,
);

publicationRouter.put(
    "/update/vacancies/:id_user",
    isAuthenticated,
    publicationsController.updateVacancies,
);

publicationRouter.put(
    "/update/status/:id_user",
    isAuthenticated,
    publicationsController.cancelVacancies,
);

export default publicationRouter;
