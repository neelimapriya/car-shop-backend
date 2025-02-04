import bcrypt from 'bcrypt';
import catchAsync from '../../utils/catchAsync';
import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';



const getProfile = catchAsync(async (req, res) => {
    const { email } = req.user;
    const result = await UserService.getProfile(email);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User profile retrieved successfully',
        data: result,
    });
});

const allUsers = catchAsync(async (req, res) => {
    const result = await UserService.allUsers(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Users retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
});

const updateProfile = catchAsync(async (req, res) => {
    const { email } = req.user;
    const payload = {...req.body};

    if (req.body.password) {
        const hashPassword =  await bcrypt.hash(req.body.password, config.bcrypt_salt_round)
        payload.password = hashPassword
    } else {
        delete payload.password
    }
    const result = await UserService.updateProfile(email, payload);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Profile updated successfully',
        data: result,
    });
});

const updateUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = {...req.body};

    if (req.body.password) {
        const hashPassword =  await bcrypt.hash(req.body.password, config.bcrypt_salt_round)
        payload.password = hashPassword
    } else {
        delete payload.password
    }
    const result = await UserService.updateUser(id, payload);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Profile updated successfully',
        data: result,
    });
});

const deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserService.deleteUser(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User deleted successfully',
        data: result,
    });
});


export const UserController = {
    allUsers,
    getProfile,
    updateProfile,
    updateUser,
    deleteUser
};