import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

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

router.post(
  '/change-password',auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);

export const AuthRoute = router;
