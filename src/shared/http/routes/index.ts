import { Router } from "express";
import usersRouter from "../../../modules/users/routes/users.routes";
import sessionsRouter from "../../../modules/users/routes/sessions.routes";
import adminUsersRouter from "../../../modules/admin_users/routes/admin.users.routes";
import vehiclesRouter from "../../../modules/vehicles/routes/vehicles.routes";
import publicationRouter from "../../../modules/publications/routes/publication.routes";
import statusRequestsRouter from "../../../modules/status_request/routes/status.request.routes";
import sessionsAdminRouter from "../../../modules/admin_users/routes/sessions.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/user/session", sessionsRouter);
routes.use("/admin", adminUsersRouter);
routes.use("/admin/session", sessionsAdminRouter);
routes.use("/vehicles", vehiclesRouter);
routes.use("/publications", publicationRouter);
routes.use("/statusRequest", statusRequestsRouter);

export default routes;
