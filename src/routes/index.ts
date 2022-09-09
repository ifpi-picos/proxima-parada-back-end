import { Router, Request, Response } from "express";
import routeLogin from "./login";
import routeHome from "./home";
import routeProfile from "./profile";
import routeRides from "./rides";
const routers = Router();

routers.use("/", routeLogin);
routers.use("/home", routeHome);
routers.use("/profile", routeProfile);
routers.use("/rides", routeRides);

export default routers;
