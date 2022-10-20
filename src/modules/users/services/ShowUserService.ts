import { User } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IUserSearch {
    id: string;
}

type UserSearchShow = Omit<User, "password">;

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
                created_at: true,
                updated_at: true,
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
