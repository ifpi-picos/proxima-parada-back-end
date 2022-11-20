import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IVehicleToCreate {
    brand: string;
    model: string;
    vehicle_type: string;
    vehicle_color: string;
    license_plate: string;
    id_user: string;
}

interface IVehicleCreated {
    id: string;
    brand: string;
    model: string;
    vehicle_type: string;
    vehicle_color: string;
    license_plate: string;
    id_user: string;
}

class CreateVehicleService {
    public async execute({
        brand,
        model,
        vehicle_type,
        vehicle_color,
        license_plate,
        id_user,
    }: IVehicleToCreate): Promise<IVehicleCreated> {
        const vehicleInUser = await prismaClient.vehicle.findUnique({
            where: {
                id_user: id_user,
            },
        });

        const vehicleInUserToIF = !!vehicleInUser;

        if (vehicleInUserToIF) {
            throw new AppError("O usuário já possui um veiculo.");
        }

        const vehicle = await prismaClient.vehicle.create({
            select: {
                id: true,
                brand: true,
                model: true,
                vehicle_type: true,
                vehicle_color: true,
                license_plate: true,
                id_user: true,
            },
            data: {
                brand,
                model,
                vehicle_type,
                vehicle_color,
                license_plate,
                id_user,
            } as IVehicleCreated,
        });

        return vehicle;
    }
}

export default CreateVehicleService;
