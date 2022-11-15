import { Publication, Address } from ".prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IPublicationToCreate {
    id_user: string;
    origin_city: string;
    destination_city: string;
    origin_district: string;
    destination_district: string;
    origin_road: string;
    destination_road: string;
    origin_number: string;
    destination_number: string;
    origin_longitude: string;
    destination_longitude: string;
    origin_latitude: string;
    destination_latitude: string;
    regular: boolean;
    vacancies: string;
    modality: string;
}

interface IPublicationCreated {
    publication: Publication;
    originAddress: Address;
    destinationAddress: Address;
}

class CreatePublicationService {
    public async execute({
        id_user,
        origin_city,
        destination_city,
        origin_district,
        destination_district,
        origin_road,
        destination_road,
        origin_number,
        destination_number,
        origin_longitude,
        destination_longitude,
        origin_latitude,
        destination_latitude,
        regular,
        vacancies,
        modality,
    }: IPublicationToCreate): Promise<IPublicationCreated> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: id_user,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        const originAddress = await prismaClient.address.create({
            data: {
                city: origin_city,
                district: origin_district,
                road: origin_road,
                number: origin_number,
                longitude: origin_longitude,
                latitude: origin_latitude,
            },
        });

        const destinationAddress = await prismaClient.address.create({
            data: {
                city: destination_city,
                district: destination_district,
                road: destination_road,
                number: destination_number,
                longitude: destination_longitude,
                latitude: destination_latitude,
            },
        });

        const publication = await prismaClient.publication.create({
            data: {
                id_user: id_user,
                origin_address: originAddress.id,
                destination_address: destinationAddress.id,
                regular: regular,
                vacancies: vacancies,
                modality: modality,
            },
        });

        return {
            publication,
            originAddress,
            destinationAddress,
        };
    }
}

export default CreatePublicationService;
