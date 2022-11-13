import { StatusRequest } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IStatusRequestToUpdate {
    id: string;
    id_user: string;
    status: boolean;
}

class UpdateStatusRequestService {
    public async execute({
        id,
        id_user,
        status,
    }: IStatusRequestToUpdate): Promise<StatusRequest> {
        const statusRequest = await prismaClient.statusRequest.findUnique({
            where: {
                id,
            },
        });

        if (!statusRequest) {
            throw new AppError("StatusRequest não encontrado.");
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id: id_user,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        if (status === true) {
            await prismaClient.user.update({
                data: {
                    status: status,
                },
                where: {
                    id: id_user,
                },
            });
        }

        const statusRequestReturn = await prismaClient.statusRequest.update({
            where: {
                id: id,
            },
            data: {
                status: status,
                readed: true,
            },
        });

        return statusRequestReturn;
    }
}

export default UpdateStatusRequestService;
