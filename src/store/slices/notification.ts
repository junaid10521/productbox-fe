import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "@types";

const initialState: INotification = {
  status: "",
  content: "",
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<INotification>) => {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
