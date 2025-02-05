import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { ICar } from "./car.interface";
import Cars from "./cars.model";

const createCarService = async (file:any,payload: ICar): Promise<ICar|null> => {
  const carData: Partial<ICar> = {};
  if(file){
    const carImage=`car_${carData.brand}${Math.random().toString().split('.')[1]}`
    const path = file.path;
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(carImage, path);
      payload.image = secure_url as string;
  }
  const result = await Cars.create(payload);
  return result;
};


const getAllCars = async () => {
  const result = await Cars.find();
  return result;
};

const getSingleCarService = async (id: string) => {
  const result = await Cars.findById(id);
  console.log(result);
  return result;
};
// const updateCar = async (id: string, data: ICar) => {
//   const result = await Cars.findByIdAndUpdate(id, data, {
//     new: true,
//   });
//   console.log(result,"service");
//   return result;
// };

const updateCar = async (id: string, data: ICar) => {
  try {
    const result = await Cars.findByIdAndUpdate(id, data, {
      new: true, // Return updated document
      runValidators: true, // Ensure validations are applied
    });

    if (!result) {
      console.log(`Car with ID ${id} not found.`);
      return null;
    }

    console.log("Service: Updated Car Data:", result);
    return result;
  } catch (error) {
    console.error("Error updating car in service:", error);
    throw error;
  }
};


const deleteCar = (id: string) => {
  const result = Cars.findByIdAndDelete(id);
  return result;
};

export const carService = {
  createCarService,
  getAllCars,
  getSingleCarService,
  updateCar,
  deleteCar,
};
