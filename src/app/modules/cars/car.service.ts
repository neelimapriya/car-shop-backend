import { ICar } from "./car.interface"
import Cars from "./cars.model"


const createCarService=async(payload:ICar):Promise<ICar>=>{
    const result=await Cars.create(payload)
    return result
}

const getAllCars=async()=>{
    const result= await Cars.find()
    return result;
}

const getSingleCar=async(id:string)=>{
    const result=await Cars.findById(id)
    return result
}

export const carService={
    createCarService,
    getAllCars,
    getSingleCar
}