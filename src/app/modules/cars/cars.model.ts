import { model, Schema } from "mongoose";
import { ICar } from "./car.interface";

const carSchema=new Schema({
    brand: {
        type: String,
        required: [true,"Brand name is required"],
        trim: true,
      },
      model: {
        type: String,
        required: [true,"Model name is required"],
        trim: true,
      },
      year: {
        type: Number,
        required: [true,"Year is required"],
       
      },
      price: {
        type: Number,
        required: [true,"Price is required"],
        min: 0,
      },
      category: {
        type: String,
        required: [true,"category is required"],
        trim: true,
      },
      description: {
        type: String,
        required: [true,"description is required"],
        trim: true,
      },
      quantity: {
        type: Number,
        required: [true,"Quantity is required"],
        min: 0,
      },
      inStock: {
        type: Boolean,
        default: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
})

const Cars=model<ICar>("car",carSchema)

export default Cars