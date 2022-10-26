import { Router } from "express";
import usersRouter from "../../../modules/users/routes/users.routes";
import sessionsRouter from "../../../modules/users/routes/sessions.routes";
import adminUsersRouter from "../../../modules/admin_users/routes/admin.users.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/adminUsers", adminUsersRouter);

export default routes;
