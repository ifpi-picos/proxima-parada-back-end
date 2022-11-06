import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IVehicleToDelete {
    id: string;
}

class DeleteProductService {
    public async execute({ id }: IVehicleToDelete): Promise<void> {
        const vehicle = await prismaClient.vehicle.findUnique({
            where: {
                id: id,
            },
        });

        if (!vehicle) {
            throw new AppError("Veiculo não encontrado.");
        }

        await prismaClient.vehicle.delete({
            where: {
                id: id,
            },
        });
    }
}

export default DeleteProductService;
