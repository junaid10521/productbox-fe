import React from "react";
import { IButtonProps } from "@types";

export const Button: React.FC<IButtonProps> = ({
  text,
  loading,
  onClick,
  type = "button",
  className,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      type={type}
      className={`${className} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      disabled={loading}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;
