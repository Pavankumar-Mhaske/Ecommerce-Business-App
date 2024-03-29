import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./AuthService";

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkAPI) => {
    try {
      console.log("thunkAPI in authSlice is : ", thunkAPI);
      const response = await authService.login(user);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// getMonthwiseOrdersInfo
export const getMonthwiseOrdersInfo = createAsyncThunk(
  "auth/get-monthwise-orders-info",
  async (_, thunkAPI) => {
    try {
      console.log("thunkAPI in authSlice is : ", thunkAPI);
      const response = await authService.getMonthwiseOrdersIncome();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// getOrderListAdmin
export const getOrderListAdmin = createAsyncThunk(
  "auth/get-order-list-admin",
  async (_, thunkAPI) => {
    try {
      console.log("thunkAPI in authSlice is : ", thunkAPI);
      const response = await authService.getOrderListAdmin();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getUserFromLocalStorage = localStorage.getItem("adminUser")
  ? JSON.parse(localStorage.getItem("adminUser"))
  : null;

export const resetState = createAction("reset_all");
const initialState = {
  user: getUserFromLocalStorage,
  ordersInfo: [],
  allOrders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload.message;
        if (state.isError === true) {
          alert(action.payload.response.data.message);
        }
      })
      .addCase(getMonthwiseOrdersInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthwiseOrdersInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.ordersInfo = action.payload.data.data;
        console.log(
          "action.payload in userSlice is 🥔🥔 : ",
          action.payload.data.data
        );
      })
      .addCase(getMonthwiseOrdersInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(getOrderListAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderListAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.allOrders = action.payload.data.orders;
        console.log(
          "action.payload in userSlice is ⭐⭐ : ",
          action.payload.data.orders
        );
      })
      .addCase(getOrderListAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
