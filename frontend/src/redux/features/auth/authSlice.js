import { createSlice } from "@reduxjs/toolkit";
import { clearCartItems } from "../cart/cartSlice";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearCartItems, (state, action) => {
      state.cartItems = [];
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
  dispatch(clearCartItems());
};

export default authSlice.reducer;
