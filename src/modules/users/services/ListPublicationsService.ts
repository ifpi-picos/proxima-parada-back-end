import { Publication } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IUser {
    id: string;
}

class ListPublicationsService {
    public async execute({ id }: IUser): Promise<Publication[]> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        const publications = await prismaClient.publication.findMany({
            orderBy: {
                departure_date: "desc",
            },
            select: {
                id: true,
                id_user: true,
                departure_date: true,
                origin_address: true,
                destination_address: true,
                statusPublication: true,
                regular: true,
                vacancies: true,
                modality: true,
                OriginAddress: true,
                DestinationAddress: true,
            },
            where: {
                id_user: id,
            },
        });

        /* if (!publications[0]) {
            throw new AppError("Este usuário não possui publicação.", 200);
        } */

        return publications;
    }
}

export default ListPublicationsService;
