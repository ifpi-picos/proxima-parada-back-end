import { User } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";

type ReturnUsers = Omit<User, "password">;

class ListUsersService {
    public async execute(): Promise<ReturnUsers[]> {
        const usersToLoop = await prismaClient.user.findMany();

        const users = [];

        for (let i = 0; i < usersToLoop.length; i++) {
            users.push({
                id: usersToLoop[i].id,
                name: usersToLoop[i].name,
                email: usersToLoop[i].email,
                phone_number: usersToLoop[i].phone_number,
                occupation: usersToLoop[i].occupation,
                avatar: usersToLoop[i].avatar,
                status: usersToLoop[i].status,
                created_at: usersToLoop[i].created_at,
                updated_at: usersToLoop[i].updated_at,
            });
        }

        return users;
    }
}

export default ListUsersService;
