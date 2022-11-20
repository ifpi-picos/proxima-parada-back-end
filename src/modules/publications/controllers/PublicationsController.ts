import { Request, Response } from "express";
import CreatePublicationService from "../services/CreatePublicationService";
import ListPublicationsService from "../services/ListPublicationsService";
import ShowPublicationService from "../services/ShowPublicationService";

export default class PublicationsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            id_user,
            origin_city,
            destination_city,
            origin_neighborhood,
            destination_neighborhood,
            origin_street,
            destination_street,
            origin_number,
            destination_number,
            regular,
            modality,
        } = request.body;

        const createPublication = new CreatePublicationService();

        const publication = await createPublication
            .execute({
                id_user,
                origin_city,
                destination_city,
                origin_neighborhood,
                destination_neighborhood,
                origin_street,
                destination_street,
                origin_number,
                destination_number,
                regular,
                modality,
            })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(publication);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showPublication = new ShowPublicationService();

        const publication = await showPublication
            .execute({ id })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(publication);
    }

    public async indexPublications(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listPublications = new ListPublicationsService();
        const publications = await listPublications.execute().catch(error => {
            response.statusCode = 400;
            return error;
        });

        return response.json(publications);
    }
}
