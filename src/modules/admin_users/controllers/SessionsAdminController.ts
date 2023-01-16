import { Request, Response } from "express";
import CreateSessionsAdminService from "../services/CreateSessionsAdminService";

export default class SessionsAdminController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const createAdminSession = new CreateSessionsAdminService();

        try {
            const admin = await createAdminSession.execute({
                email,
                password,
            });
            response.cookie("token", admin.token, {
                maxAge: new Date(Date.now() + 999999999).getTime(),
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });

            return response.json(admin.adminReturn);
        } catch (error) {
            response.statusCode = 401;
            return response.json(error);
        }
    }
}
