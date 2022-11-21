import { Publication, Address } from ".prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IPublicationToCreate {
    id_user: string;
    departure_date: string;
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
}

interface IPublicationCreated {
    publication: Publication;
    originAddress: Address;
    destinationAddress: Address;
}

class CreatePublicationService {
    public async execute({
        id_user,
        departure_date,
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
                neighborhood: origin_neighborhood,
                street: origin_street,
                number: origin_number,
            },
        });

        const destinationAddress = await prismaClient.address.create({
            data: {
                city: destination_city,
                neighborhood: destination_neighborhood,
                street: destination_street,
                number: destination_number,
            },
        });

        const separate_date = departure_date.split("-");
        const year = separate_date[0];
        const month = separate_date[1];
        const day = separate_date[2];

        const departure_date_converted = new Date(`${year}-${month}-${day}`);

        const publication = await prismaClient.publication.create({
            data: {
                id_user: id_user,
                departure_date: departure_date_converted,
                origin_address: originAddress.id,
                destination_address: destinationAddress.id,
                regular: regular,
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
