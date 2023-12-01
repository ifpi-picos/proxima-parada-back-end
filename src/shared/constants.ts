import * as dotenv from "dotenv";

export interface IConstants {
    databaseUrl: string;
    jwtSecret: string;
    firebasePrivateKeyId: string;
    firebasePrivateKey: string;
    port: number;
    tokenExpireIn: string;
}

export const getConstants = (): IConstants => {
    dotenv.config();

    return {
        databaseUrl: process.env.DATABASE_URL as string,
        jwtSecret: process.env.JWT_SECRET as string,
        firebasePrivateKeyId: process.env.FIREBASE_PRIVATE_KEI_ID as string,
        firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY as string,
        port: Number(process.env.PORT),
        tokenExpireIn: process.env.TOKEN_EXPIREIN as string,
    };
};
