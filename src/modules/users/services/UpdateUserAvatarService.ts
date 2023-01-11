import AppError from "../../../shared/errors/AppError";
import { User } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import { utcToZonedTime } from "date-fns-tz";

interface IRequest {
    id_user: string;
    firebaseAvatarUrl: string;
}

type UserToReturn = Omit<User, "password" | "created_at" | "updated_at">;

class UpdateUserAvatarService {
    public async execute({
        id_user,
        firebaseAvatarUrl,
    }: IRequest): Promise<UserToReturn> {
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
                Vehicle: {
                    select: {
                        id: true,
                        brand: true,
                        model: true,
                        avatar: true,
                    },
                },
            },
            where: {
                id: id_user,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        const date = new Date();

        const registrationDate = utcToZonedTime(date, "America/Sao_Paulo");

        const userToReturn = await prismaClient.user.update({
            select: {
                id: true,
                name: true,
                email: true,
                phone_number: true,
                occupation: true,
                avatar: true,
                status: true,
                level: true,
                created_at: true,
                updated_at: true,
                Vehicle: {
                    select: {
                        id: true,
                        brand: true,
                        model: true,
                        avatar: true,
                    },
                },
            },
            where: {
                id: id_user,
            },
            data: {
                avatar: firebaseAvatarUrl,
                updated_at: registrationDate,
            },
        });

        return userToReturn;
    }
}

export default UpdateUserAvatarService;
