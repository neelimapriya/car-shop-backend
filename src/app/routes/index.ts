import { Router } from "express";
import orderRouter from "../modules/orders/order.route";
import carRouter from "../modules/cars/car.route";
import { AuthRoute } from "../modules/auth/auth.route";

const router=Router()

const moduleRoutes=[
    {
        path:'/auth',
        route:AuthRoute
    },
    {
        path:'/orders',
        route:orderRouter
    },
    {
        path:'/cars',
        route:carRouter
    },
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route))

export default router;