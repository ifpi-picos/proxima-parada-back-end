import { User } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";

type ReturnUsers = Omit<User, "password" | "created_at" | "updated_at">;

class ListUsersService {
    public async execute(): Promise<ReturnUsers[]> {
        const users = await prismaClient.user.findMany({
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
        });

        return users;
    }
}

export default ListUsersService;
