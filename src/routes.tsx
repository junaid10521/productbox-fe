import { createBrowserRouter } from "react-router-dom";
import { Home, AddProduct, Cart, PageNotFound } from "./pages";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: <AddProduct />,
  },
  {
    path: "/checkout",
    element: <Cart />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
