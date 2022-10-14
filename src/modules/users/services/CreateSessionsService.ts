import { sign } from "jsonwebtoken";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await prismaClient.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const token = sign({}, process.env.JWT_SECRET!, {
            subject: user.id,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            expiresIn: process.env.TOKEN_EXPIREIN!,
        });

        return {
            user,
            token,
        };
    }
}

export default CreateSessionsService;
