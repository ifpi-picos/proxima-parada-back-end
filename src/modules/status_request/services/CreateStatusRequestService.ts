import { StatusRequest } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IUserId {
    id: string;
}

type StatusRequestToReturn = Omit<StatusRequest, "statusDescriptionDenied">;

class CreateStatusRequestService {
    public async execute({ id }: IUserId): Promise<StatusRequestToReturn> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        const vehicle = await prismaClient.vehicle.findUnique({
            where: {
                id_user: id,
            },
        });

        if (!vehicle) {
            throw new AppError(
                "Este usuário não possui um veículo cadastrado.",
            );
        }

        const statusRequest = await prismaClient.statusRequest.create({
            select: {
                id: true,
                status: true,
                readed: true,
                id_user: true,
                created_at: true,
                updated_at: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone_number: true,
                        occupation: true,
                        avatar: true,
                        status: true,
                        level: true,
                        Vehicle: {
                            select: {
                                id: true,
                                brand: true,
                                model: true,
                                avatar: true,
                                vehicle_type: true,
                                vehicle_color: true,
                                license_plate: true,
                            },
                        },
                    },
                },
            },
            data: {
                id_user: id,
            },
        });

        return statusRequest;
    }
}

export default CreateStatusRequestService;
