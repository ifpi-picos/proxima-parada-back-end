import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../../errors/AppError";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function checkIdInToken(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const tokenInCookie = request.headers.cookie;
    const { id } = request.params;

    if (!tokenInCookie) {
        throw new AppError("O token está ausente.");
    }

    const token = tokenInCookie?.slice(6);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const decodedToken = verify(token, process.env.JWT_SECRET!);

    const { sub } = decodedToken as ITokenPayload;

    if (!(id === sub)) {
        throw new AppError("ID incorreto de usuário / Usuário não encontrado.");
    }

    return next();
}
