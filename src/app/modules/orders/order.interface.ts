import { Date, Types } from "mongoose";

export interface IOrder{
    name:string,
    email:string,
    carId:{} | null | undefined ,
    quantity:number,
    totalPrice:number,
    createdAt:NativeDate,
    updatedAt:NativeDate,
}