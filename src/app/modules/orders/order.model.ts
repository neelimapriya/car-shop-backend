import mongoose, { model, Schema,ObjectId, Types } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({

  email: {
    type: String,
    required: [true,"Email is required"],
    trim: true,
    validate:{
        validator:function(value){
            return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value)
        },
        message:"{VALUE} is not a valid email ID. Please provide a valid email ID"
    }
  },
  car: {
    type: Schema.Types.ObjectId  ,
    ref: "Car",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "please select a car"],
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  orderPayment: { type: String, enum: ['paid' , 'unpaid'], required: true, default: 'unpaid' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// static method
// orderSchema.statics.isOrderExist=async function (id:number) {
//   const existingOrder=await Order.findOne({carId:id})
//   return existingOrder
// }


const Order= model<IOrder>("order", orderSchema)
export default Order;
