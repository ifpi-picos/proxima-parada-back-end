import { prismaClient } from "../../../database/prismaClient";
import { Vehicle } from "./../../../../node_modules/.prisma/client/index.d";
class ListVehiclesService {
    public async execute(): Promise<Vehicle[]> {
        const vehicles = prismaClient.vehicle.findMany();

        return vehicles;
    }
}

export default ListVehiclesService;
