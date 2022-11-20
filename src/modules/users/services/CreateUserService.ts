import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";
import { hash } from "bcryptjs";
import { User } from "@prisma/client";

interface IUserToCreate {
    name: string;
    email: string;
    password: string;
    samePasswords: string;
    occupation: string;
}

type UserCreated = Omit<User, "password" | "created_at" | "updated_at">;

class CreateUserService {
    public async execute({
        name,
        email,
        password,
        samePasswords,
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

        /*********Conferindo a confirmação de senha do usuário na hora do cadastro*********/
        if (!(password.length >= 6)) {
            throw new AppError("A senha deve conter no mínimo 6 caracteres.");
        }

        if (!(password === samePasswords)) {
            throw new AppError("As senhas devem ser iguais.");
        }
        /**********************************************************************************/

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
                level: true,
                Vehicle: {
                    select: {
                        id: true,
                        brand: true,
                        model: true,
                        avatar: true,
                        vehicle_type: true,
                        vehicle_color: true,
                        license_plate: true,
                    },
                },
                StatusRequest: {
                    select: {
                        id: true,
                        status: true,
                        readed: true,
                        id_user: true,
                    },
                },
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
