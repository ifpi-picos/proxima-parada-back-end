import { Request, Response } from "express";
import CreateSessionsService from "../services/CreateSessionsService";

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const createSession = new CreateSessionsService();

        const { user, token } = await createSession
            .execute({
                email,
                password,
            })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        const userReturn = {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            phone_number: user?.phone_number,
            occupation: user?.occupation,
            avatar: user?.avatar,
            status: user?.status,
            created_at: user?.created_at,
            updated_at: user?.updated_at,
        };

        return response.json({ userReturn, token });
    }
}
