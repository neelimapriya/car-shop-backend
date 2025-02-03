import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import config from "../../config";
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";


const registerUser = async (payload: IUser) => {
    const user = await User.isUserExistsByEmail(payload.email);
    if (user) {
      throw new AppError(StatusCodes.BAD_REQUEST, "This user is already exist!");
    }

    const result = await User.create(payload);
    return result;
};

const loginUser = async (payload: ILoginUser) => {
    const { email, password } = payload;

    if (!email || !password) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            'Email and password are required',
        );
    }
    // checking if the user is exist
    const user = await User.isUserExistsByEmail(payload.email);
    // console.log(user,'service');
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
    }
  
 
    const isUserPasswordMatched = await bcrypt.compare(
        password,
        user.password as string,
    );

    if (!isUserPasswordMatched) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Password is Incorrect');
    }
  
    //create token and sent to the  client
    const jwtPayload = {
      email: user.email as string,
      role: user.role as string,
    };
    const token =await createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expiresIn as string
    );
    // console.log(token);
  
  
    return {
      token,
       user,
        refreshToken,
    };
  };

//   refresh token

const refreshToken = async (token: string) => {
    // verify token

    const decoded = await verifyToken(
        token,
        config.refresh_access_secret as string,
    );

    const { user } = decoded as JwtPayload;

    const DBUser = await User.findById(user);

    // checking if the user is exists
    if (!DBUser) {
        throw new AppError(StatusCodes.NOT_FOUND, 'The user is not found');
    }

    const jwtPayload = { email: DBUser.email, role: DBUser.role };

    const accessToken = await createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expiresIn as string,
    );

    return {
        accessToken,
    };
};


  export const AuthService={
    registerUser,
    loginUser,
    refreshToken

  }