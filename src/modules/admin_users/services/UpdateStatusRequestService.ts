import { StatusRequest } from "@prisma/client";
import { utcToZonedTime } from "date-fns-tz";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IStatusRequestToUpdate {
    id: string;
    id_user: string;
    status: boolean;
    statusDescriptionDenied: string;
}

class UpdateStatusRequestService {
    public async execute({
        id,
        id_user,
        status,
        statusDescriptionDenied,
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

        const date = new Date();

        const updateDate = utcToZonedTime(date, "America/Sao_Paulo");

        if (status === true) {
            await prismaClient.user.update({
                data: {
                    status: status,
                },
                where: {
                    id: id_user,
                },
            });
        } else {
            await prismaClient.statusRequest.update({
                where: {
                    id: id,
                },
                data: {
                    statusDescriptionDenied: statusDescriptionDenied,
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
                updated_at: updateDate,
            },
        });

        return statusRequestReturn;
    }
}

export default UpdateStatusRequestService;
