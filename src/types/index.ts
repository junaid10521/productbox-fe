
export interface IProduct {
  id: number;
  name: string;
  price: number;
  img: string;
}
export interface INotification {
  status: string;
  content: string;
}
export interface IButtonProps {
  text: string;
  loading?: boolean;
  onClick?: Function;
  type?: "button" | "submit" | "reset";
  className?: string;
}
export interface IFormData {
  name: string;
  price: string;
  img: string;
}
export interface ICartItem extends IProduct {
  quantity: number;
  totalPrice: number;
}
export interface ICart {
  totalAmount: number;
  items: ICartItem[];
}
