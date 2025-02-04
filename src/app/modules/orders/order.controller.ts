import { Request, Response } from "express";
import { orderService, getTotalPriceFromDB } from "./order.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await orderService.createCustomerOrder(payload);

    res.status(200).json({
      success: true,
      message: "order created successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      message: "Something went wrong",
      error: err,
    });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getOrderService();
    res.status(200).json({
      success: true,
      message: "Order Getting successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      message: "Something went wrong",
      error: err,
    });
  }
};


const getSingleOrder = catchAsync(async (req, res) => {
  const { email } = req.user;

  const result = await orderService.getSingleOrderService(email, req.query);

  sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Order retrieved successfully',
      data: result.data,
      meta: result.meta,
  });
});

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const totalPrice = await getTotalPriceFromDB();
    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: { totalPrice },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Total revenue not found",
      error,
    });
  }
};

export const orderController = {
  createOrder,
  getOrder,
  getTotalPrice,
  getSingleOrder
};
