import { NextFunction, Request, Response } from "express";
import admin, { ServiceAccount } from "firebase-admin";
import AppError from "../../errors/AppError";
import serviceAccount from "../../../config/firebase-key.json";

const BUCKET = "proxima-parada-storage.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadUserAvatarMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    if (!request.file) return next();

    const avatar = request.file;

    const nameFile = Date.now() + "." + avatar.originalname.split(".").pop();

    const file = bucket.file("/users/" + nameFile);

    const stream = file.createWriteStream({
        metadata: {
            contentType: avatar.mimetype,
        },
    });

    stream.on("error", error => {
        console.error(error);
        throw new AppError(error.message, 500);
    });

    stream.on("finish", async () => {
        // Tornar publico o arquivo
        await file.makePublic();
        // Obter a URL publica
        (
            request.file as any
        ).firebaseUrl = `https://storage.googleapis.com/${BUCKET}/users/${nameFile}`;

        next();
    });

    stream.end(avatar.buffer);
};

export default uploadUserAvatarMiddleware;
