import { Publication } from ".prisma/client";
import { prismaClient } from "../../../database/prismaClient";

class ListPublicationsService {
    public async execute(): Promise<Publication[]> {
        const publications = await prismaClient.publication.findMany({
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
                OriginAddress: {
                    select: {
                        id: true,
                        city: true,
                        district: true,
                        road: true,
                        number: true,
                        longitude: true,
                        latitude: true,
                    },
                },
                DestinationAddress: {
                    select: {
                        id: true,
                        city: true,
                        district: true,
                        road: true,
                        number: true,
                        longitude: true,
                        latitude: true,
                    },
                },
            },
        });

        return publications;
    }
}

export default ListPublicationsService;