import AppError from "../../../shared/errors/AppError";
import { User } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";

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
            },
            where: {
                id: id_user,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

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
            },
            where: {
                id: id_user,
            },
            data: {
                avatar: firebaseAvatarUrl,
            },
        });

        return userToReturn;
    }
}

export default UpdateUserAvatarService;
