export interface ICar {
  brand: string;
  image: string;
  model: string;
  year: number;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}
