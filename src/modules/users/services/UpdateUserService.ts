import { utcToZonedTime } from "date-fns-tz";
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

        const phoneNumberExists = await prismaClient.user.findUnique({
            where: {
                phone_number,
            },
        });

        // eslint-disable-next-line no-extra-boolean-cast
        if (!!phoneNumberExists) {
            throw new AppError("Número já utilizado por outro usuário.");
        }

        const date = new Date();

        const registrationDate = utcToZonedTime(date, "America/Sao_Paulo");

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
                created_at: true,
                updated_at: true,
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
                updated_at: registrationDate,
            },
        });

        return userUpdated as IUserUpdateToReturn;
    }
}

export default UpdateUserService;
