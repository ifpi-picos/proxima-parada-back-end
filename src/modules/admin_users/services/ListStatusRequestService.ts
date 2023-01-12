import { StatusRequest } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";

type StatusRequestToReturn = Omit<StatusRequest, "statusDescriptionDenied">;

class ListStatusRequestService {
    public async execute(): Promise<StatusRequestToReturn[]> {
        const statusRequest = await prismaClient.statusRequest.findMany({
            orderBy: {
                created_at: "desc",
            },
            where: {
                readed: false,
            },
            select: {
                id: true,
                status: true,
                readed: true,
                id_user: true,
                statusDescriptionDenied: true,
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
                                vehicle_type: true,
                                vehicle_color: true,
                                license_plate: true,
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
