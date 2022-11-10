import { Publication } from ".prisma/client";
import { Address, User } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

type UserSearchShow = Omit<User, "password" | "created_at" | "updated_at">;

interface IPublicationSearch {
    id: string;
}

interface IPublicationReturn {
    publication: Publication;
    originAddress: Address;
    destinationAddress: Address;
    user: UserSearchShow;
}

class ShowPublicationService {
    public async execute({
        id,
    }: IPublicationSearch): Promise<IPublicationReturn> {
        const publication = await prismaClient.publication.findUnique({
            where: {
                id: id,
            },
        });

        if (!publication) {
            throw new AppError("Publicação não encontrada.");
        }

        const originAddress = await prismaClient.address.findUnique({
            where: {
                id: publication.origin_address,
            },
        });

        if (!originAddress) {
            throw new AppError("Endereço de origem não encontrado.");
        }

        const destinationAddress = await prismaClient.address.findUnique({
            where: {
                id: publication.destination_address,
            },
        });

        if (!destinationAddress) {
            throw new AppError("Endereço de destino não encontrado.");
        }

        const user = await prismaClient.user.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                phone_number: true,
                occupation: true,
                avatar: true,
                status: true,
                level: true,
            },
            where: {
                id: publication.id_user,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        return {
            publication,
            originAddress,
            destinationAddress,
            user,
        };
    }
}

export default ShowPublicationService;
