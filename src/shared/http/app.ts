import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import cors from "cors";
import AppError from "../errors/AppError";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

const options: cors.CorsOptions = {
    origin: process.env.BASE_URL_CLIENT,
    credentials: true, //access-control-allow-credentials:true
    optionsSuccessStatus: 200,
};

app.use(cors(options));
//app.use(cors(corsOptions));

app.use("/api", routes);

app.use(cookieParser());

app.get("/api", (request, response) => {
    response
        .status(200)
        .send('<h1 style="texte-align: center">Api Próxima Parada Online</h1>');
});

app.use(
    (error: any, request: Request, response: Response, next: NextFunction) => {
        console.log(error);
        return response.status((error as AppError).statusCode ?? 500).send({
            message: (error as AppError).message,
            statusCode: (error as AppError).statusCode ?? 500,
        });
    },
);

export default app;
