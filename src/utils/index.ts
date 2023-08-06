import { ICartItem } from "@types";

export const returnImageUrl = (url: string): string => {
  if (url.startsWith("./img/")) {
    return `${process.env.REACT_APP_BACKEND_URL}${url.substring(1)}`;
  } else {
    return url;
  }
};
export const calculateTotalAmount = (items: ICartItem[]) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
