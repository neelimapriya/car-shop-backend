import QueryBuilder from "../../builder/QueryBuilder";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { searchableCarField } from "./car.constant";
import { ICar } from "./car.interface";
import Cars from "./cars.model";

const createCarService = async (
  file: any,
  payload: ICar
): Promise<ICar | null> => {
  const carData: Partial<ICar> = {};
  if (file) {
    const carImage = `car_${carData.brand}${Math.random().toString().split(".")[1]}`;
    const path = file.path;
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(carImage, path);
    payload.image = secure_url as string;
  }
  const result = await Cars.create(payload);
  return result;
};

const getAllCars = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(Cars.find(), query)
    .search(searchableCarField)
    .filter()
    .sort()
    .pagination()
    .fields();
  const meta = await result.countTotal();
  const data = await result.modelQuery;
  return {
    meta,
    data,
  };
};

const getSingleCarService = async (id: string) => {
  const result = await Cars.findById(id);
  // console.log(result);
  return result;
};

const updateCar = async (id: string, data: ICar) => {
  try {
    const result = await Cars.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      // console.log(`Car ${id} not found.`);
      return null;
    }

    return result;
  } catch (error) {
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
