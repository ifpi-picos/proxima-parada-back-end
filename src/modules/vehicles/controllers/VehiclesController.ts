import { Request, Response } from "express";
import CreateVehicleService from "../services/CreateVehicleService";
import ShowVehicleService from "../services/ShowVehicleService";

export default class VehiclesController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { brand, model, id_user } = request.body;

        const createVehicle = new CreateVehicleService();

        const vehicle = await createVehicle
            .execute({
                brand,
                model,
                id_user,
            })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(vehicle);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showVehicleService = new ShowVehicleService();

        const vehicle = await showVehicleService
            .execute({ id })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(vehicle);
    }
}
