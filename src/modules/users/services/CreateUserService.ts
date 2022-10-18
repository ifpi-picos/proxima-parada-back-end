import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";
import { hash } from "bcryptjs";
import { User } from "@prisma/client";

interface IUserToCreate {
    name: string;
    email: string;
    password: string;
    occupation: string;
}

type UserCreated = Omit<User, "password">;

class CreateUserService {
    public async execute({
        name,
        email,
        password,
        occupation,
    }: IUserToCreate): Promise<UserCreated> {
        /*********Conferindo se o email inserido pelo usuário está "padronizado"*********/
        const standardizedEmail = /\S+@\S+\.\S+/;

        if (!standardizedEmail.test(email)) {
            throw new AppError("Endereço de e-mail inválido.");
        }
        /********************************************************************************/

        /***Conferindo se o email inserido pelo usuário já está sendo utilizado por outro usuário***/
        const userResponse = await prismaClient.user.findUnique({
            select: {
                email: true,
            },
            where: {
                email: email,
            },
        });

        const emailExists = !!userResponse;

        if (emailExists) {
            throw new AppError("Endereço de e-mail já usado.");
        }
        /******************************************************************************************/

        const hashedPassword = await hash(password, 8);

        const user = await prismaClient.user.create({
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
            data: {
                name,
                email,
                password: hashedPassword,
                occupation,
            } as IUserToCreate,
        });

        return user;
    }
}

export default CreateUserService;
