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
        const publicationsToLoop = await prismaClient.publication.findMany();

        const publications = [];

        for (let i = 0; i < publicationsToLoop.length; i++) {
            const originAddress = await prismaClient.address.findFirst({
                where: {
                    id: publicationsToLoop[i].origin_address,
                },
            });

            const destinationAddress = await prismaClient.address.findFirst({
                where: {
                    id: publicationsToLoop[i].destination_address,
                },
            });

            const aux = [];

            aux.push(publicationsToLoop[i], originAddress, destinationAddress);

            publications.push(aux);
        }

        return publications;
    }
}

export default ListPublicationsService;
