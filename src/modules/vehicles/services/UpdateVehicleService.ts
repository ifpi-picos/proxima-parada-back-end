import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IVehicleToUpdate {
    id: string;
    brand: string;
    model: string;
}

interface IVehicleUpdateToReturn {
    id: string;
    brand: string;
    model: string;
    id_user: string;
}

class UpdateVehicleService {
    public async execute({
        id,
        brand,
        model,
    }: IVehicleToUpdate): Promise<IVehicleUpdateToReturn> {
        const vehicleExists = await prismaClient.vehicle.findUnique({
            where: {
                id_user: id,
            },
        });

        if (!vehicleExists) {
            throw new AppError("Este usuário não tem um veiculo cadastrado.");
        }

        const vehicle = await prismaClient.vehicle.update({
            select: {
                id: true,
                brand: true,
                model: true,
                id_user: true,
            },
            where: {
                id_user: id,
            },
            data: {
                brand,
                model,
            },
        });

        return vehicle;
    }
}

export default UpdateVehicleService;
