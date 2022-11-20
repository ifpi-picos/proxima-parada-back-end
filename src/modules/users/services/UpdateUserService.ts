import { prismaClient } from "../../../database/prismaClient";
import AppError from "../../../shared/errors/AppError";

interface IUserToUpdate {
    id: string;
    name: string;
    phone_number: string;
    occupation: string;
}

interface IUserUpdateToReturn {
    id: string;
    name: string;
    phone_number: string;
    occupation: string;
}

class UpdateUserService {
    public async execute({
        id,
        name,
        phone_number,
        occupation,
    }: IUserToUpdate): Promise<IUserUpdateToReturn> {
        const userExists = await prismaClient.user.findUnique({
            where: {
                id,
            },
        });

        if (!userExists) {
            throw new AppError("Usuário não encontrado.");
        }

        const userUpdated = await prismaClient.user.update({
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
            where: {
                id: id,
            },
            data: {
                name: name,
                phone_number: phone_number,
                occupation: occupation,
            },
        });

        return userUpdated as IUserUpdateToReturn;
    }
}

export default UpdateUserService;
