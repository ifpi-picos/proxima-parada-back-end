import { Publication } from "@prisma/client";
import moment from "moment";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IUser {
    id: string;
}

class ListPublicationsService {
    public async execute({ id }: IUser): Promise<unknown> {
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

        const publicationsReturn = [];
        for (let i = 0; i < publications.length; i++) {
            publicationsReturn.push({
                departure_hour: moment(publications[i].departure_date)
                    .utc()
                    .local()
                    .format("HH:mm A"),
                departure_date: moment(publications[i].departure_date).format(
                    "DD/MM/YYYY",
                ),
                id: publications[i].id,
                id_user: publications[i].id_user,
                modality: publications[i].modality,
                regular: publications[i].regular,
                statusPublication: publications[i].statusPublication,
                vacancies: publications[i].vacancies,
                DestinationAddress: publications[i].DestinationAddress,
                OriginAddress: publications[i].OriginAddress,
            });
        }

        return publicationsReturn;
    }
}

export default ListPublicationsService;
