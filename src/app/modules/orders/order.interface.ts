export interface IOrder {
  email: string;
  car: {} | null | undefined;
  quantity: number;
  totalPrice: number;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}

// export interface IOrderModel extends Model<IOrder>{
//     isOrderExist(id:number): Promise<IOrder | null>;
// }
