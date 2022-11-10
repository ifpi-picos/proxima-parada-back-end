import { Publication } from ".prisma/client";
import { User } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

type UserSearchShow = Omit<User, "password" | "created_at" | "updated_at">;

interface IPublicationSearch {
    id: string;
}

interface IPublicationReturn {
    publication: Publication;
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

        const user = await prismaClient.user.findUnique({
            where: {
                id: publication.id_user,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        return { publication, user };
    }
}

export default ShowPublicationService;
