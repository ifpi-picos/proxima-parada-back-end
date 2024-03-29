import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";
import CreateAdminUserService from "../services/CreateAdminUserService";
import DeleteProductService from "../services/DeleteVehicleService";
import ListAdminsService from "../services/ListAdminsService";
import ListStatusRequestService from "../services/ListStatusRequestService";
import ListUsersService from "../services/ListUsersService";
import ListVehiclesService from "../services/ListVehiclesService";
import UpdateStatusRequestService from "../services/UpdateStatusRequestService";

export default class AdminUsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password, samePasswords } = request.body;

        const createAdminUser = new CreateAdminUserService();

        const adminUser = await createAdminUser
            .execute({
                name,
                email,
                password,
                samePasswords,
            })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(adminUser);
    }

    public async indexUsers(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listUsers = new ListUsersService();
        const users = await listUsers.execute().catch(error => {
            response.statusCode = 400;
            return error;
        });

        return response.json(users);
    }

    public async indexAdmins(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listAdmins = new ListAdminsService();

        const admins = await listAdmins.execute().catch(error => {
            response.statusCode = 400;
            return error;
        });

        return response.json(admins);
    }

    public async indexStatusRequest(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listStatusRequest = new ListStatusRequestService();

        const statusRequest = await listStatusRequest.execute().catch(error => {
            response.statusCode = 400;
            return error;
        });

        return response.json(statusRequest);
    }

    public async indexVehicles(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listVehicles = new ListVehiclesService();
        const vehicles = await listVehicles.execute().catch(error => {
            response.statusCode = 400;
            return error;
        });

        return response.json(vehicles);
    }

    public async deleteVehicle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteVehicle = new DeleteProductService();

        await deleteVehicle.execute({ id }).catch(error => {
            response.statusCode = 400;
            return error;
        });

        return response.json([]);
    }

    public async updateStatusRequest(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id_user, status, statusDescriptionDenied } = request.body;
        const { id } = request.params;

        const updateStatusRequest = new UpdateStatusRequestService();

        const statusRequest = await updateStatusRequest
            .execute({ id, id_user, status, statusDescriptionDenied })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(statusRequest);
    }

    public async countNumberUsers(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userCount = await prismaClient.user.count();
        const driverCount = await prismaClient.user.count({
            where: {
                status: true,
            },
        });
        const postsCount = await prismaClient.publication.count();
        const statistics = {
            users: userCount,
            drivers: driverCount,
            publications: postsCount,
        };
        return response.json(statistics);
    }
}
