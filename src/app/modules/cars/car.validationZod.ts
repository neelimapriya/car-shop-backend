import { z } from "zod";

const carSchema = z.object({
  brand: z
    .string()
    .trim()
    .nonempty("Brand name is required"),
  model: z
    .string()
    .trim()
    .nonempty("Model name is required"),
  year: z
    .number()
    .nonnegative("Year is required"), 
  price: z
    .number()
    .min(0, "Price must be greater than or equal to 0")
    .nonnegative("Price is required"),
  category: z
    .string()
    .trim()
    .nonempty("Category is required"),
  description: z
    .string()
    .trim()
    .nonempty("Description is required"),
  quantity: z
    .number()
    .min(0, "Quantity must be greater than or equal to 0")
    .nonnegative("Quantity is required"),
  inStock: z
    .boolean()
    .optional() 
    .default(true),
  createdAt: z
    .date()
    .default(() => new Date()), 
  updatedAt: z
    .date()
    .default(() => new Date()),
});

export default carSchema;
