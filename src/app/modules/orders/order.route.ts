import { Router } from "express";
import { orderController } from "./order.controller";

const orderRouter=Router()

orderRouter.post("/create-order",orderController.createOrder)
orderRouter.get("/get-orders",orderController.getOrder)
orderRouter.get("/revenue",orderController.getTotalPrice)


export default orderRouter