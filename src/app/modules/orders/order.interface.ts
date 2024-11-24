import { Model } from "mongoose";

export interface IOrder{
    name:string,
    email:string,
    carId:{} | null | undefined ,
    quantity:number,
    totalPrice:number,
    createdAt:NativeDate,
    updatedAt:NativeDate,
}

// export interface IOrderModel extends Model<IOrder>{
//     isOrderExist(id:number): Promise<IOrder | null>;
// }