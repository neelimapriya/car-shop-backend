import { Request, Response } from "express";
import Order from "./order.model";
import { orderService } from "./order.service";

const createOrder=async(req:Request, res:Response)=>{
    try{
        const payload=req.body
    const result=await orderService.createCustomerOrder(payload)

    res.status(200).json({
        success: true,
        message: "order created successfully",
        data:result
      });
   
    }catch(err){
        res.json({
            message:"Something went wrong",
            error:err
         
        })
    }
}

const getOrder=async(req:Request, res:Response)=>{
try{
    const result =await orderService.getOrderService()
    res.status(200).json({
        success: true,
        message: "Order Getting successfully",
        data:result
      });

}catch(err){
    res.json({
        message:"Something went wrong",
        error:err
     
    })
}
}


export const orderController={
    createOrder,
    getOrder
}