import { Publication } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IStatusPublicationToUpdate {
    id_user: string;
    id: string;
    statusPublication: boolean;
}

class UpdateStatusPublicationService {
    public async execute({
        id_user,
        id,
        statusPublication,
    }: IStatusPublicationToUpdate): Promise<Publication> {
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
                statusPublication: statusPublication,
            },
            where: {
                id: id,
            },
        });

        return publication;
    }
}

export default UpdateStatusPublicationService;
