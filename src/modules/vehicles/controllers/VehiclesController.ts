import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";
import CreateVehicleService from "../services/CreateVehicleService";
import ShowVehicleService from "../services/ShowVehicleService";
import UpdateVehicleService from "../services/UpdateVehicleService";

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

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { brand, model } = request.body;
        const { id } = request.params;

        const updateVehicleService = new UpdateVehicleService();

        const vehicle = await updateVehicleService
            .execute({
                id,
                brand,
                model,
            })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(vehicle);
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.params;

        const vehicle = await prismaClient.vehicle.delete({
            where: {
                id,
            },
        });

        response.json(vehicle);
    }

    public async allVehicles(request: Request, response: Response) {
        const vehicles = await prismaClient.vehicle.findMany();

        response.json(vehicles);
    }
}
