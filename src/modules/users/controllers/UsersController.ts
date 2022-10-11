import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password, occupation } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser
            .execute({
                name,
                email,
                password,
                occupation,
            })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(user);
    }
}
