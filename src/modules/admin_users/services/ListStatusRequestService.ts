import { StatusRequest } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";

class ListStatusRequestService {
    public async execute(): Promise<StatusRequest[]> {
        const statusRequest = await prismaClient.statusRequest.findMany({
            select: {
                id: true,
                status: true,
                readed: true,
                id_user: true,
                created_at: true,
                updated_at: true,
                user: {
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
                            },
                        },
                    },
                },
            },
        });

        return statusRequest;
    }
}

export default ListStatusRequestService;
