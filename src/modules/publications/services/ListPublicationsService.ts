import { Publication } from ".prisma/client";
import { prismaClient } from "../../../database/prismaClient";

class ListPublicationsService {
    public async execute(): Promise<Publication[]> {
        const publications = await prismaClient.publication.findMany({
            select: {
                id: true,
                id_user: true,
                departure_date: true,
                departure_hour: true,
                origin_address: true,
                destination_address: true,
                statusPublication: true,
                regular: true,
                vacancies: true,
                modality: true,
                User: {
                    select: {
                        name: true,
                        avatar: true,
                        occupation: true,
                    },
                },
                OriginAddress: {
                    select: {
                        id: true,
                        city: true,
                        neighborhood: true,
                        street: true,
                        number: true,
                    },
                },
                DestinationAddress: {
                    select: {
                        id: true,
                        city: true,
                        neighborhood: true,
                        street: true,
                        number: true,
                    },
                },
            },
            where: {
                vacancies: true,
            },
        });

        return publications;
    }
}

export default ListPublicationsService;
