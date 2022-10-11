import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";
import { hash } from "bcryptjs";

interface IRequest {
    name: string;
    email: string;
    password: string;
    occupation: string;
}

class CreateUserService {
    public async execute({ name, email, password, occupation }: IRequest) {
        const emailExists = !!(await prismaClient.user.findUnique({
            where: {
                email: email,
            },
        }));

        if (emailExists) {
            throw new AppError("Email address already used.");
        }

        const hashedPassword = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                occupation,
            } as IRequest,
        });

        return user;
    }
}

export default CreateUserService;
