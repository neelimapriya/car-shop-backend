import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const orderRouter = Router();

orderRouter.post("/", orderController.createOrder);

orderRouter.get(
  "/:email",
  auth(USER_ROLE.admin, USER_ROLE.user),
  orderController.getSingleOrder
);
orderRouter.get("/get-orders", orderController.getOrder);
orderRouter.get("/revenue", orderController.getTotalPrice);

export default orderRouter;
