import { Types } from "mongoose";
import Cars from "../cars/cars.model";
import { IOrder } from "./order.interface";
import Order from "./order.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";

const createCustomerOrder = async (payload: IOrder): Promise<IOrder> => {
  const findProduct = await Cars.findOne({
    _id:payload.car,
    "quantity": { $gte: payload.quantity },
  });

  if (findProduct === null) {
    throw new Error("Insufficient quantity available in inventory");
  }
  findProduct.quantity -= payload.quantity;
  findProduct.inStock = findProduct.quantity > 0;

  await findProduct.save();

  const result = await Order.create(payload);
  console.log("car:", payload.car);
  return result;
  // const result = await Order.create(payload);
  // return result;

};

const getOrderService = async () => {
  const result = await Order.find();
  return result;
};
const getSingleOrderService = async (email: string, query: Record<string, unknown>) => {
  const AuthUser = await User.findOne({ email });
  if (!AuthUser) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User Not Found');
  }

  const orderQuery = new QueryBuilder(
      Order.find({
          userId: AuthUser._id,
      }).populate('car'),
      query,
  )
      .search(['orderPayment'])
      .filter()
      .sort()
      .pagination()
      .fields();

  const meta = await orderQuery.countTotal();
  const data = await orderQuery.modelQuery;

  return {
      meta,
      data,
  };
};
export const getTotalPriceFromDB =async()=>{
  const reveneu= await Order.aggregate([
    {
      $project:{
        totalPrice:{$multiply:["$totalPrice", "$quantity"]}
      },

    },
    {
      $group:{
        _id:null,
        totalRevenue:{$sum:"$totalPrice"}
      }
    }
  ])

  const result= reveneu[0]?.totalRevenue || 0
  return result
}
export const orderService = {
  createCustomerOrder,
  getOrderService,
  getSingleOrderService,
  getTotalPriceFromDB,
};
