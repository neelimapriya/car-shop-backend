import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const orderRouter = Router();

orderRouter.post("/",auth(USER_ROLE.admin, USER_ROLE.user), orderController.createOrder);

orderRouter.get(
  "/:email",
  auth(USER_ROLE.admin, USER_ROLE.user),
  orderController.getSingleOrder
);
orderRouter.get("/",auth(USER_ROLE.admin), orderController.getOrder);
orderRouter.get("/revenue",auth(USER_ROLE.admin), orderController.getTotalPrice);

export default orderRouter;
