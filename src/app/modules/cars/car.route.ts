import { Router } from "express";
import { carController } from "./car.controller";

const carRouter = Router();

carRouter.post("/", carController.createCar);
carRouter.get("/", carController.getCars);
carRouter.get("/:carId", carController.getSingleCar);
carRouter.put("/:carId", carController.updateACar);
carRouter.delete ("/:carId", carController.deleteCar);

export default carRouter;
