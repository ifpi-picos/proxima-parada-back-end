import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IVehicleToUpdate {
    id: string;
    brand: string;
    model: string;
    vehicle_type: string;
    vehicle_color: string;
    license_plate: string;
}

interface IVehicleUpdateToReturn {
    id: string;
    brand: string;
    model: string;
    vehicle_type: string;
    vehicle_color: string;
    license_plate: string;
    id_user: string;
}

class UpdateVehicleService {
    public async execute({
        id,
        brand,
        model,
        vehicle_type,
        vehicle_color,
        license_plate,
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
                vehicle_type: true,
                vehicle_color: true,
                license_plate: true,
                id_user: true,
            },
            where: {
                id_user: id,
            },
            data: {
                brand,
                model,
                vehicle_type,
                vehicle_color,
                license_plate,
            },
        });

        return vehicle;
    }
}

export default UpdateVehicleService;
