import { Request, Response } from "express";
import { carService } from "./car.service";

//  --------POST CAR--------
const createCar = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await carService.createCarService(payload);

    res.status(200).json({
      success: true,
      message: "Car created successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      message: "Something went wrong",
      error: err,
    });
  }
};

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
      message: "something went wrong",
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
