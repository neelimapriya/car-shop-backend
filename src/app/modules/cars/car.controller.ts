import { Request, Response } from "express";
import { carService } from "./car.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

//  --------POST CAR--------
const createCar=catchAsync(async(req,res)=>{
  const payload=req.body
  console.log(payload);
  const result=await carService.createCarService(req.file, payload)
  console.log(result);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Car added successfully',
    data: result,
});
})

// -----------------GET  CAR----------
const getCars = async (req: Request, res: Response) => {
  try {
    const result = await carService.getAllCars();
    res.status(200).json({
      success: true,
      message: "Cars retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      message: "Something went wrong",
      error: err,
    });
  }
};

// --------------GET A CAR-----------------
const getSingleCar = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const carId = req.params.carId;
    const result = await carService.getSingleCarService(carId);
    res.send({
      status: true,
      message: "Car retrieved successfully",
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Something went wrong",
      error,
    });
  }
};

// -----------UPDATE CAR------------
const updateACar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.carId;
    const body = req.body;
    const result = await carService.updateCar(carId, body);

    res.send({
      status: true,
      message: "Car updated successfully",
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Something went wrong",
      error,
    });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;

    await carService.deleteCar(carId);
    res.status(200).json({
      success: true,
      message: "Car deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

export const carController = {
  createCar,
  getCars,
  getSingleCar,
  updateACar,
  deleteCar,
};
