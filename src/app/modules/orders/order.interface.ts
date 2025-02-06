import { Types } from "mongoose";

export interface IOrder {
  email: string;
  car: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  orderPayment: 'paid' | 'unpaid'
  createdAt: NativeDate;
  updatedAt: NativeDate;
}

// export interface IOrderModel extends Model<IOrder>{
//     isOrderExist(id:number): Promise<IOrder | null>;
// }

