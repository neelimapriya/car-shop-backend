import { Router } from "express";
import { carController } from "./car.controller";

const carRouter = Router();

carRouter.post("/create-car", carController.createCar);
carRouter.get("/get-car", carController.getCars);

export default carRouter;
