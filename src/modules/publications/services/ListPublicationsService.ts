import { Publication } from ".prisma/client";
import { Address } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";

interface IReturnListPublications {
    publications: Publication;
    originAddress: Address;
    destinationAddress: Address;
}

class ListPublicationsService {
    public async execute(): Promise<any[]> {
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
