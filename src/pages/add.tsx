import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IFormData } from "@types";
import { Layout, Button } from "@components";
import { useAppDispatch } from "@store/hooks";
import { setNotification } from "@store/slices/notification";

export const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    price: "",
    img: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Upading state value here
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    fieldName: keyof IFormData
  ): void => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: event.target.value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsSubmitting(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/items`, formData)
      .then(() => {
        navigate("/");
        dispatch(
          setNotification({
            status: "success",
            content: "Product added successfully.",
          })
        );
      })
      .catch(() => {
        dispatch(
          setNotification({
            status: "error",
            content: "Unable to add product.",
          })
        );

        setIsSubmitting(false);
      });
  };

  return (
    <Layout>
      <div className="w-[500px] mx-auto mt-12">
        <h1 className="text-center text-3xl font-semibold">Add Product</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field) => (
            <div className="relative z-0 w-full mb-6 group" key={field}>
              <input
                onChange={(e) => handleInputChange(e, field as keyof IFormData)}
                type="text"
                name={field}
                id={field}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor={field}
                className={`peer-focus:font-medium absolute text-sm text-black duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                  field === "name" ? "peer-focus:text-blue-600" : ""
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}
          <Button type="submit" text="Submit" loading={isSubmitting} />
        </form>
      </div>
    </Layout>
  );
};
