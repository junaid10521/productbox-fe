import { Link } from "react-router-dom";
import { RootState } from "@store/store";
import { useAppSelector } from "@store/hooks";
import CartIcon from "@images/cart.svg";

export const Header: React.FC = () => {
  const cart = useAppSelector((state: RootState) => state.cart);
  return (
    <header>
      <nav className="w-full border-b bg-white shadow py-1 mb-6">
        <div className="w-11/12 md:w-full container mx-auto flex justify-between items-center">
          <Link to="/">Productbox</Link>
          <Link to="/add" className="font-medium mr-6">
            Add Products
          </Link>
          <Link to="/checkout">
            <div className="relative py-2">
              <div className="t-0 absolute left-3">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                  {cart.items.length}
                </p>
              </div>
              <img src={CartIcon} alt="Cart" className="mt-4 h-6 w-6" />
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};
