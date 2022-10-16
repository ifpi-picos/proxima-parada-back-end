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
            throw new AppError("Endereço de e-mail já usado.");
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

        const userReturn = {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            phone_number: user?.phone_number,
            occupation: user?.occupation,
            avatar: user?.avatar,
            status: user?.status,
            created_at: user?.created_at,
            updated_at: user?.updated_at,
        };

        return userReturn;
    }
}

export default CreateUserService;
