import { Request, Response } from "express";
import CreateSessionsService from "../services/CreateSessionsService";

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const createSession = new CreateSessionsService();

        const user = await createSession
            .execute({
                email,
                password,
            })
            .catch(error => {
                response.statusCode = 401;
                return error;
            });
        response.cookie("token", user.token, {
            maxAge: new Date(Date.now() + 999999999).getTime(),
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        return response.json(user);
    }
}
