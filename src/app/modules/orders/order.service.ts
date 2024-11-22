import { IOrder } from "./order.interface";
import Order from "./order.model";

const createCustomerOrder = async (payload: IOrder): Promise<IOrder> => {
  const result = await Order.create(payload);
  return result;
};

const getOrderService=async()=>{

    const result=await Order.find()
    return result
}
const getSingleOrderService=async(id:string)=>{

    const result=await Order.findById(id)
    return result
}

export const orderService = {
  createCustomerOrder,
  getOrderService,
 
};
