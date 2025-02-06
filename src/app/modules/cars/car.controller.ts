import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { carService } from "./car.service";
import { StatusCodes } from "http-status-codes";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createCar = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await carService.createCarService(req.file, payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Car added successfully',
    data: result,
  });
});

// -----------------GET CARS----------
const getCars = catchAsync(async (req: Request, res: Response) => {
  const result = await carService.getAllCars(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cars retrieved successfully",
    data: result.data,
    meta:result.meta,
  });
});

// --------------GET A CAR-----------------
const getSingleCar = catchAsync(async (req: Request, res: Response) => {
  const carId = req.params.carId;
  const result = await carService.getSingleCarService(carId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Car retrieved successfully",
    data: result,
  });
});

// -----------UPDATE CAR------------
const updateACar = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  let updatedData = req.body;

  // If an image is uploaded, process it
  if (req.file) {
    const cloudinaryResult = await sendImageToCloudinary(req.file.filename, req.file.path);
    if (cloudinaryResult && cloudinaryResult.secure_url) {
      updatedData.image = cloudinaryResult.secure_url;
    } else {
      console.log("Failed to upload image to Cloudinary.");
    }
  }

  const result = await carService.updateCar(id, updatedData);

  if (!result) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "Car not found",
      data:result
    });
    return;
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Car updated successfully",
    data: result,
  });
});

// -----------DELETE CAR------------
const deleteCar = catchAsync(async (req: Request, res: Response) => {
  const { carId } = req.params;
  await carService.deleteCar(carId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Car deleted successfully",
    data:null
  });
});

export const carController = {
  createCar,
  getCars,
  getSingleCar,
  updateACar,
  deleteCar,
};