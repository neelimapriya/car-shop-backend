import { NextFunction, Request, Response } from "express";
import { IUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import config from "../config";
import { User } from "../modules/user/user.model";


export const auth = (...requestRoles: IUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;
            // console.log(token,"auth.ts");
            if (!token) {
                throw new AppError(
                    StatusCodes.UNAUTHORIZED,
                    'You have no access to this route',
                );
            }

            // verify token

            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            );
            const { email, role,iat } = decoded as JwtPayload;

            const auhUser = await User.isUserExistsByEmail(email);

            // checking if the user is exists
            if (!auhUser) {
                throw new AppError(
                    StatusCodes.NOT_FOUND,
                    'The user is not found',
                );
            }

            if (requestRoles && !requestRoles.includes(role)) {
                throw new AppError(
                    StatusCodes.UNAUTHORIZED,
                    'You have no access to this route',
                );
            }
            req.user = { email, role };

            next();
        },
    );
};

export default auth;