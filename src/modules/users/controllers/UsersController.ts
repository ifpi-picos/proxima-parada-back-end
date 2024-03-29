import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListPublicationsService from "../services/ListPublicationsService";
import ShowUserService from "../services/ShowUserService";
import UpdateUserService from "../services/UpdateUserService";
import SessionsController from "./SessionsController";

export default class UsersController {
    public async create(request: Request, response: Response) {
        const { name, email, password, samePasswords, occupation } =
            request.body;

        const createUser = new CreateUserService();

        const user = await createUser
            .execute({
                name,
                email,
                password,
                samePasswords,
                occupation,
            })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        if (user.id) {
            const session = new SessionsController();
            session.create(request, response);
        } else {
            return response.json(user);
        }

        //return response.json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, phone_number, occupation } = request.body;
        const { id } = request.params;

        const updateUserService = new UpdateUserService();

        const user = await updateUserService
            .execute({
                id,
                name,
                phone_number,
                occupation,
            })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(user);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showUserService = new ShowUserService();

        const user = await showUserService.execute({ id }).catch(error => {
            response.statusCode = 400;
            return error;
        });

        return response.json(user);
    }

    public async indexPublications(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const listPublications = new ListPublicationsService();

        const publications = await listPublications
            .execute({ id })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(publications);
    }
}
