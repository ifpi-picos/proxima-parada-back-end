import { Publication } from ".prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import moment from "moment";

class ListPublicationsService {
    public async execute(): Promise<unknown[]> {
        const publications = await prismaClient.publication.findMany({
            select: {
                id: true,
                id_user: true,
                departure_date: true,
                origin_address: true,
                destination_address: true,
                statusPublication: true,
                regular: true,
                vacancies: true,
                modality: true,
                User: {
                    select: {
                        name: true,
                        avatar: true,
                        occupation: true,
                        Vehicle: {
                            select: {
                                vehicle_type: true,
                                brand: true,
                                model: true,
                                vehicle_color: true,
                                license_plate: true,
                            },
                        },
                    },
                },
                OriginAddress: {
                    select: {
                        id: true,
                        city: true,
                        neighborhood: true,
                        street: true,
                        number: true,
                    },
                },
                DestinationAddress: {
                    select: {
                        id: true,
                        city: true,
                        neighborhood: true,
                        street: true,
                        number: true,
                    },
                },
            },
            orderBy: {
                departure_date: "asc",
            },
            where: {
                vacancies: true,
            },
        });

        const publicationsReturn = [];
        for (let i = 0; i < publications.length; i++) {
            publicationsReturn.push({
                User: publications[i].User,
                date_original: publications[i].departure_date,
                departure_hour: moment(publications[i].departure_date)
                    .utc()
                    .local()
                    .format("HH:mm A"),
                departure_date: moment(publications[i].departure_date).format(
                    "DD/MM/YYYY",
                ),
                DestinationAddress: publications[i].DestinationAddress,
                OriginAddress: publications[i].OriginAddress,
                id: publications[i].id,
                id_user: publications[i].id_user,
                modality: publications[i].modality,
                regular: publications[i].regular,
                statusPublication: publications[i].statusPublication,
                vacancies: publications[i].vacancies,
            });
        }

        return publicationsReturn;
    }
}

export default ListPublicationsService;
