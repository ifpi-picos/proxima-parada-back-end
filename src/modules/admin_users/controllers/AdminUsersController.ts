import { Request, Response } from "express";
import CreateAdminUserService from "../services/CreateAdminUserService";
import ListUsersService from "../services/ListUsersService";

export default class AdminUsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password, samePasswords } = request.body;

        const createAdminUser = new CreateAdminUserService();

        const adminUser = await createAdminUser
            .execute({
                name,
                email,
                password,
                samePasswords,
            })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(adminUser);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listUsers = new ListUsersService();
        const users = await listUsers.execute();

        return response.json(users);
    }
}
