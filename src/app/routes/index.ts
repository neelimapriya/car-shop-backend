import { Router } from "express";
import orderRouter from "../modules/orders/order.route";
import carRouter from "../modules/cars/car.route";
import { AuthRoute } from "../modules/auth/auth.route";
import { UserRoute } from "../modules/user/user.route";

const router=Router()

const moduleRoutes=[
    {
        path:'/auth',
        route:AuthRoute
    },
    {
        path:'/users',
        route:UserRoute
    },
    {
        path:'/orders',
        route:orderRouter
    },
    {
        path:'/cars',
        route:carRouter
    },
    // { path: '/payment', route: PaymentRoute },
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route))

export default router;