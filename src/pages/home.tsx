import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "@components";
import { IProduct } from "@types";
import { returnImageUrl } from "@utils";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { RootState } from "@store/store";
import { addProductToCart } from "@store/slices/cart";
import { Link } from "react-router-dom";
import { setNotification } from "@store/slices/notification";
import AddToCart from "@images/add-to-cart.svg";
import CartIcon from "@images/cart.svg";
export const Home: React.FC = () => {
  const cart = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  // Fetching Products
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/items`)
      .then((response) => {
        setProducts(response.data);
        setIsFetching(false);
      })
      .catch((error) => {
        setIsFetching(false);
        dispatch(
          setNotification({
            status: "error",
            content: "Unable to fetch products.",
          })
        );
      });
  }, [dispatch]);

  const alreadyInCart = (id: number) => {
    return cart.items.find((item) => item.id === id);
  };

  return (
    <Layout>
      <div className="container mx-auto flex justify-between w-11/12 md:w-full">
        {isFetching ? (
          <h1 className="text-center w-full mt-12 text-2xl font-bold">
            Loading...
          </h1>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product: IProduct) => {
              return (
                // If this card item is utilized in multiple locations, it would be beneficial to create it as a component.
                <div className="group relative" key={product.id}>
                  <div className="h-[300px] aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75">
                    <img
                      alt="Product"
                      src={returnImageUrl(product.img)}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">{product.name}</h3>
                      <p className="text-sm font-medium text-gray-900">
                        ${product.price}
                      </p>
                    </div>
                    {alreadyInCart(product.id) ? (
                      <Link to="/checkout">
                        <img src={CartIcon} alt="Cart" className="h-8 w-8" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          dispatch(addProductToCart(product));
                        }}
                      >
                        <img src={AddToCart} alt="Cart Icon" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};
