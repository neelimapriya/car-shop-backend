import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";


const registerUser = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await AuthService.registerUser(payload);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});

const logIn = catchAsync(async (req, res) => {
    const payload = req.body;
    const { token, refreshToken, user } = await AuthService.loginUser(payload);
    // console.log(token),
    res.cookie('refreshToken', refreshToken, {
        secure: config.Node_env === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365, //cookie expire duration
    });

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User logged in successfully',
        token: token,
        data: user,
    });
});

const getRefreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);
    const { accessToken } = result;

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Access token is retrieved successfully',
        data: { accessToken },
    });
});

const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;

    const result = await AuthService.changePassword(req.user, passwordData);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User Password Changed successfully',
        data: result,
    });
});

export const AuthController={
    registerUser,
    logIn,
    getRefreshToken,
    changePassword
}