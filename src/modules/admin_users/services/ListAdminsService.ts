import { AdminUser } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";

type ReturnAdmins = Omit<AdminUser, "password" | "created_at" | "updated_at">;

class ListAdminsService {
    public async execute(): Promise<ReturnAdmins[]> {
        const admins = await prismaClient.adminUser.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                level: true,
            },
        });

        return admins;
    }
}

export default ListAdminsService;
