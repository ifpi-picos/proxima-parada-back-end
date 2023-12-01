import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../../config/firebase-key.json";
import AppError from "../../../shared/errors/AppError";
import { getConstants } from "../../../shared/constants";
const BUCKET = "proxima-parada-storage.appspot.com";



serviceAccount.private_key = getConstants().firebasePrivateKey!.toString().replace(
    /\\n/g,
    "\n",
);

serviceAccount.private_key_id = process.env.FIREBASE_PRIVATE_KEI_ID!;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateAvatar = new UpdateUserAvatarService();

        if (!request.file) {
            throw new AppError("Arquivo não encontrado");
        }

        const avatar = request.file;

        const nameFile =
            request.user.id + "." + avatar.originalname.split(".").pop();

        const file = bucket.file("users/" + nameFile);

        try {
            await file.save(avatar.buffer);

            await file.makePublic();
        } catch (error) {
            response.statusCode = 400;
            throw error;
        }

        const firebaseAvatarUrl = file.publicUrl();

        const user = await updateAvatar
            .execute({
                id_user: request.user.id,
                firebaseAvatarUrl: firebaseAvatarUrl,
            })
            .catch(error => {
                response.statusCode = 400;
                return error;
            });

        return response.json(user);
    }
}
