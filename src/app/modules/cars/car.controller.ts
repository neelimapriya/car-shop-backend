import { Request, Response } from "express";
import { carService } from "./car.service";

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
const getCars=async(req:Request, res:Response)=>{
    try{
        const result =await carService.getAllCars()
        res.status(200).json({
            success: true,
            message: "Get a Car successfully",
            data:result
          });
    }catch(err){
        res.json({
            message: "Something went wrong",
            error: err,
          });
    }
}
export const carController={
    createCar,
    getCars
}