import { Layout, Button } from "@components";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { RootState } from "@store/store";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
} from "@store/slices/cart";
import { ICartItem } from "@types";
import { returnImageUrl } from "@utils";
import { Link } from "react-router-dom";
export const Cart = () => {
  const cart = useAppSelector((state: RootState) => state.cart);
  
  const dispatch = useAppDispatch();
  return (
    <Layout>
      <div className="min-h-screen">
        <h1 className="mb-10 text-center text-3xl font-semibold">Cart Items</h1>
        {!cart.items.length ? (
          <p className="text-center font-medium">
            Cart Empty,{" "}
            <Link to="/" className="text-blue-500">
              Start Shopping
            </Link>{" "}
          </p>
        ) : (
          <div className="mx-auto container justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cart.items.map((product: ICartItem) => {
                return (
                  <div
                    key={product.id}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <img
                      src={returnImageUrl(product.img)}
                      alt={product.name}
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {product.name}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          ${product.price} X {product.quantity} = $
                          {product.totalPrice}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <button
                            onClick={() => {
                              dispatch(decreaseQuantity(product.id));
                            }}
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            -{" "}
                          </button>
                          <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={product.quantity}
                            min="1"
                            readOnly
                          />
                          <button
                            onClick={() => {
                              dispatch(increaseQuantity(product.id));
                            }}
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            +{" "}
                          </button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => {
                              dispatch(removeItemFromCart(product.id));
                            }}
                            className="text-sm text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    ${cart.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
              <Button text="Check out" className="!w-full mt-4" />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
