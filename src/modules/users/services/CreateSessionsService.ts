import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface ISessionToCreated {
    email: string;
    password: string;
}

interface ISessionToReturn {
    userReturn: {
        id: string;
        name: string;
        email: string;
        phone_number: string | null;
        occupation: string;
        avatar: string | null;
        status: boolean;
        created_at: Date;
        updated_at: Date;
    };
    token: string;
}

class CreateSessionsService {
    public async execute({
        email,
        password,
    }: ISessionToCreated): Promise<ISessionToReturn> {
        const user = await prismaClient.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new AppError("Combinação incorreta de e-mail/senha.", 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError("Combinação incorreta de e-mail/senha.", 401);
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const token = sign({ sub: user.id }, process.env.JWT_SECRET as string, {
            // subject: user.id,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            expiresIn: process.env.TOKEN_EXPIREIN,
        });

        const userReturn = await prismaClient.user.findUnique({
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
                email,
            },
        });

        return {
            userReturn,
            token,
        } as ISessionToReturn;
    }
}

export default CreateSessionsService;
