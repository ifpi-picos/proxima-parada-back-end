import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../../errors/AppError";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const tokenInCookie = request.headers.cookie;

    if (!tokenInCookie) {
        throw new AppError("O token está ausente.");
    }

    const token = tokenInCookie?.slice(6);

    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const decodedToken = verify(token, process.env.JWT_SECRET!);

        const { sub } = decodedToken as ITokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError("Token inválido.");
    }
}
