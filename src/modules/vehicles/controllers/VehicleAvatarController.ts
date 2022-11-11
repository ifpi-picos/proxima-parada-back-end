import { Request, Response } from "express";
import admin from "firebase-admin";
import AppError from "../../../shared/errors/AppError";
import UpdateVehiclesAvatarService from "../services/UpdateVehiclesAvatarService";

const bucket = admin.storage().bucket();

export default class VehicleAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const updateAvatar = new UpdateVehiclesAvatarService();

        if (!request.file) {
            throw new AppError("Arquivo não encontrado");
        }

        const avatar = request.file;

        const nameFile = id + "." + avatar.originalname.split(".").pop();

        const file = bucket.file("vehicles/" + nameFile);

        try {
            await file.save(avatar.buffer);

            await file.makePublic();
        } catch (error) {
            response.statusCode = 400;
            throw error;
        }

        const firebaseAvatarUrl = file.publicUrl();

        const vehicle = await updateAvatar
            .execute({ id, firebaseAvatarUrl: firebaseAvatarUrl })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(vehicle);
    }
}
