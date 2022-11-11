import AppError from "../../../shared/errors/AppError";
import { Vehicle } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";

interface IRequest {
    id: string;
    firebaseAvatarUrl: string;
}

class UpdateVehiclesAvatarService {
    public async execute({
        id,
        firebaseAvatarUrl,
    }: IRequest): Promise<Vehicle> {
        const vehicle = await prismaClient.vehicle.findUnique({
            where: {
                id: id,
            },
        });

        if (!vehicle) {
            throw new AppError("Veículo não encontrado.");
        }

        const vehicleToReturn = await prismaClient.vehicle.update({
            where: {
                id: id,
            },
            data: {
                avatar: firebaseAvatarUrl,
            },
        });

        return vehicleToReturn;
    }
}

export default UpdateVehiclesAvatarService;
