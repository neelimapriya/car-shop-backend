import { z } from "zod";
import { UserRole } from "../user/user.constant";

const registrationValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is Required' }).trim(),
        email: z.string().email({ message: 'Email must be valid' }),
        password: z
            .string({ invalid_type_error: 'Password must be string' })
            .max(20, { message: "Password Can't be more then 20 characters" }),
        role: z.enum(UserRole, { message: 'Role must be admin or user' }).optional()
    }),
});
const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required!",
    }),
  }),
});

export const AuthValidation = {
    registrationValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
};
