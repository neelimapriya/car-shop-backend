import { NextFunction, Request, Response, Router } from "express";
import { carController } from "./car.controller";
import validateRequest from "../../middleware/validateRequest";
import { carSchema } from "./car.validationZod";
import auth from "../../middleware/auth";
import { USER_ROLE, UserRole } from "../user/user.constant";
import { upload } from "../../utils/sendImageToCloudinary";

const carRouter = Router();

carRouter.post(
  "/",
  // auth(USER_ROLE.admin),
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = JSON.parse(req.body.data);
      next();
    } catch (error) {
      res.status(400).json({ error: "Invalid JSON data" });
    }
  },
  validateRequest(carSchema.createCar),
  carController.createCar
);
carRouter.get("/", carController.getCars);
carRouter.get("/:carId", carController.getSingleCar);

// carRouter.put(
//   "/:id",
//   upload.single("image"),
//   async(req: Request, res: Response, next: NextFunction) => {
//     try {
//       if (req.body.data) {
//         req.body = JSON.parse(req.body.data);
//       }
//       next();
//     } catch (error) {
//       console.log(error, "json data error");
//       res.status(400).json({ error: "Invalid JSON data" });
//     }
//   },
//   carController.updateACar)
carRouter.put(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }
      next();
    } catch (error) {
      // console.log("JSON Data Error:", error);
      res.status(400).json({ error: "Invalid JSON data" });
    }
  },
  carController.updateACar
);


carRouter.delete("/:carId", carController.deleteCar);

export default carRouter;
