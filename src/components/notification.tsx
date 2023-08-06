import { useAppSelector, useAppDispatch } from "@store/hooks";
import { RootState } from "@store/store";
import { setNotification } from "@store/slices/notification";
import SuccessImage from "@images/success.png";
import CloseImage from "@images/close.png";
import ErrorImage from "@images/error.svg";

export const Notification: React.FC = () => {
  const notification = useAppSelector((state: RootState) => state.notification);
  const dispatch = useAppDispatch();

  const closeNotification = () => {
    dispatch(
      setNotification({
        status: "",
        content: "",
      })
    );
  };

  return (
    <div
      className={`min-w-[350px] md:min-w-[400px] fixed top-12 right-0 bg-white p-3 shadow-xl flex justify-between rounded-xl transition ease-in-out z-20 ${
        !notification.status ? "translate-x-full" : ""
      }`}
    >
      <div className="flex">
        <div>
          <img
            src={notification.status === "success" ? SuccessImage : ErrorImage}
            className="mx-auto w-12 h-12"
            alt="Success"
          />
        </div>
        <div className="ml-4 pt-2">
          <h1 className="text-black font-semibold text-sm">
            {notification.status === "success" ? "Success" : "Info"}
          </h1>
          <p className="text-notification text-xs lg:text-sm mt-1">
            {notification.content}
          </p>
          <button
            onClick={() => {
              closeNotification();
            }}
            className="text-notification font-semibold text-sm mt-2 lg:mt-4"
          >
            Dismiss
          </button>
        </div>
      </div>
      <div className="lg:pl-12 pl-8 pr-3">
        <button
          onClick={() => {
            closeNotification();
          }}
        >
          <img src={CloseImage} className="mx-auto w-3 h-3" alt="Close" />
        </button>
      </div>
    </div>
  );
};
