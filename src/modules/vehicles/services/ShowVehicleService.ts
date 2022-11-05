import { Vehicle } from "./../../../../node_modules/.prisma/client/index.d";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IVehicleSearch {
    id: string;
}

class ShowVehicleService {
    public async execute({ id }: IVehicleSearch): Promise<Vehicle> {
        const vehicle = await prismaClient.vehicle.findUnique({
            where: {
                id_user: id,
            },
        });

        if (!vehicle) {
            throw new AppError("Veiculo não encontrado.");
        }

        return vehicle;
    }
}

export default ShowVehicleService;
