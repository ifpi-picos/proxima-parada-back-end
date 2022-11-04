import { User } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IUserSearch {
    id: string;
}

type UserSearchShow = Omit<User, "password" | "created_at" | "updated_at">;

class ShowUserService {
    public async execute({ id }: IUserSearch): Promise<UserSearchShow> {
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
                id: id,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        return user;
    }
}

export default ShowUserService;
