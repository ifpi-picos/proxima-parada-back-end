import { AdminUser } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface ISessionToCreated {
    email: string;
    password: string;
}

type AdminOmit = Omit<AdminUser, "password" | "created_at" | "updated_at">;

interface ISessionToReturn {
    adminReturn: AdminOmit;
    token: string;
}

class CreateSessionsAdminService {
    public async execute({
        email,
        password,
    }: ISessionToCreated): Promise<ISessionToReturn> {
        const admin = await prismaClient.adminUser.findUnique({
            where: {
                email: email,
            },
        });

        if (!admin) {
            //throw new AppError("Combinação incorreta de e-mail/senha.", 401);
            throw new AppError("Email incorreto.", 401);
        }

        const passwordConfirmed = await compare(password, admin.password);

        if (!passwordConfirmed) {
            throw new AppError("Combinação incorreta de e-mail/senha.", 401);
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const token = sign(
            { sub: admin.id },
            process.env.JWT_SECRET as string,
            {
                // subject: admin.id,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                expiresIn: process.env.TOKEN_EXPIREIN,
            },
        );

        const adminReturn = await prismaClient.adminUser.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                level: true,
            },
            where: {
                email,
            },
        });

        return {
            adminReturn,
            token,
        } as ISessionToReturn;
    }
}

export default CreateSessionsAdminService;
