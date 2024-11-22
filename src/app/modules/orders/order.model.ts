import mongoose, { model, Schema,ObjectId, Types } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({
  name: {
    type: String,
    required: [true,"Name is required"],
    minlength:5,
    maxlength:20
  },
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
  carId: {
    type: Types.ObjectId  ,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Order= model<IOrder>("order", orderSchema)
export default Order;
