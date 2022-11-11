import { Request, Response } from "express";
import CreateStatusRequestService from "../services/CreateStatusRequestService";

export default class StatusRequestsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id_user } = request.params;

        const createStatusRequest = new CreateStatusRequestService();

        const statusRequest = await createStatusRequest
            .execute({
                id: id_user,
            })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(statusRequest);
    }
}
