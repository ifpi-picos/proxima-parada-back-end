import { Publication } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IVacanciesToUpdate {
    id_user: string;
    id: string;
    vacancies: string;
}

class UpdateVacanciesPublicationService {
    public async execute({
        id_user,
        id,
        vacancies,
    }: IVacanciesToUpdate): Promise<Publication> {
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

        let vacanciesBoolean;

        if (vacancies === "false") {
            vacanciesBoolean = false;
        }

        if (vacancies === "true") {
            vacanciesBoolean = true;
        }

        const publication = await prismaClient.publication.update({
            data: {
                vacancies: vacanciesBoolean,
            },
            where: {
                id: id,
            },
        });

        return publication;
    }
}

export default UpdateVacanciesPublicationService;
