import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import config from "../../config";
import bcrypt from "bcrypt";
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
      "Email and password are required"
    );
  }
  // checking if the user is exist
  const userCheck = await User.isUserExistsByEmail(email as string);
  // console.log(user,'service');
  if (!userCheck) {
    throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
  }

  const isUserPasswordMatched = await bcrypt.compare(
    password,
    userCheck.password as string
  );

  if (!isUserPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Password is Incorrect");
  }
  // if (status === 'blocked') {
  //   throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  // }
  //create token and sent to the  client
  const jwtPayload = {
    email: userCheck.email as string,
    role: userCheck.role as string,
  };
  const token = await createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as string
  );
  const refreshToken = await createToken(
    jwtPayload,
    config.refresh_access_secret as string,
    config.refresh_access_expiresIn as string
  );
  // console.log(token,"token");
  // console.log(refreshToken,"refresh token");

  const user = await User.findOne({ email: userCheck.email });
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
    config.refresh_access_secret as string
  );

  const { user } = decoded as JwtPayload;

  const DBUser = await User.findById(user);

  // checking if the user is exists
  if (!DBUser) {
    throw new AppError(StatusCodes.NOT_FOUND, "The user is not found");
  }

  const jwtPayload = { email: DBUser.email, role: DBUser.role };

  const accessToken = await createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as string
  );

  return {
    accessToken,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const { oldPassword, newPassword } = payload;

  const user = await User.findById(userData.user);

  // checking if the user is exists
  if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'The user is not found');
  }

  // checking if user password is matched
  if (!(await User.isUserPasswordMatched(oldPassword, user?.password))) {
      throw new AppError(
          StatusCodes.FORBIDDEN,
          'The User password is incorrect',
      );
  }

  const newHasPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_round));

  await User.findOneAndUpdate(
      {
          id: userData.user,
          role: userData.role,
      },
      {
          password: newHasPassword,
          needChangePassword: false,
          passwordChangeAt: new Date(),
      },
  );

  return null;
};

export const AuthService = {
  registerUser,
  loginUser,
  refreshToken,
  changePassword
};
