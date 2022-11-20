import { Address, Publication } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IPublicationToUpdate {
    id: string;
    origin_city: string;
    destination_city: string;
    origin_neighborhood: string;
    destination_neighborhood: string;
    origin_street: string;
    destination_street: string;
    origin_number: string;
    destination_number: string;
    regular: boolean;
    modality: string;
    id_user: string;
}

interface IPublicationUpdated {
    publication: Publication;
    originAddress: Address;
    destinationAddress: Address;
}

class UpdatePublicationService {
    public async execute({
        id,
        origin_city,
        destination_city,
        origin_neighborhood,
        destination_neighborhood,
        origin_street,
        destination_street,
        origin_number,
        destination_number,
        regular,
        modality,
        id_user,
    }: IPublicationToUpdate): Promise<IPublicationUpdated> {
        const userExists = await prismaClient.user.findUnique({
            where: {
                id: id_user,
            },
        });

        if (!userExists) {
            throw new AppError("Usuário não encontrado.");
        }

        const publicationExists = await prismaClient.publication.findUnique({
            where: {
                id: id,
            },
        });

        if (!publicationExists) {
            throw new AppError("Publicação não encontrada.");
        }

        const publication = await prismaClient.publication.update({
            data: {
                regular: regular,
                modality: modality,
            },
            where: {
                id: id,
            },
        });

        const originAddress = await prismaClient.address.update({
            data: {
                city: origin_city,
                neighborhood: origin_neighborhood,
                street: origin_street,
                number: origin_number,
            },
            where: {
                id: publication.origin_address,
            },
        });

        const destinationAddress = await prismaClient.address.update({
            data: {
                city: destination_city,
                neighborhood: destination_neighborhood,
                street: destination_street,
                number: destination_number,
            },
            where: {
                id: publication.destination_address,
            },
        });

        return { publication, originAddress, destinationAddress };
    }
}

export default UpdatePublicationService;
