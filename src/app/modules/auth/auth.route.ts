import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registrationValidationSchema),
  AuthController.registerUser
);

router.post(
 
  "/login",
 
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.logIn
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.registerUser
);

export const AuthRoute = router;
