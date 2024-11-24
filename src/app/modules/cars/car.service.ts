import { ICar } from "./car.interface";
import Cars from "./cars.model";

const createCarService = async (payload: ICar): Promise<ICar> => {
  const result = await Cars.create(payload);
  return result;
};

const getAllCars = async () => {
  const result = await Cars.find();
  return result;
};

const getSingleCarService = async (id: string) => {
  const result = await Cars.findById(id);
  return result;
};
const updateCar = async (id: string, data: ICar) => {
  const result = await Cars.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
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
