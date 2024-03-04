import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderService from "./OrderService";

export const getOrders = createAsyncThunk(
  "orders/get-orders",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in OrderSlice is : ", thunkAPI);
      const response = await OrderService.getOrders();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAOrder = createAsyncThunk(
  "orders/get-order",
  async (orderId, thunkAPI) => {
    try {
      console.log("thunkAPI in OrderSlice is : ", thunkAPI);
      const response = await OrderService.getAOrder(orderId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/update-order-status",
  async (orderData, thunkAPI) => {
    try {
      console.log("thunkAPI in OrderSlice is : ", thunkAPI);
      const response = await OrderService.updateOrderStatus(orderData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");
const initialState = {
  orders: [],
  order: {},
  updatedOrder: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const orderSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload.data.orders;
        console.log(
          "action.payload in orderSlice is :💚💚💚 ",
          action.payload.data.orders
        );
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      .addCase(getAOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload.data.order;
        console.log(
          "action.payload in orderSlice is :💚💚💚 ",
          action.payload.data.order
        );
      })
      .addCase(getAOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedOrder = action.payload.data;
        console.log(
          "action.payload in orderSlice is :💚💚💚 ",
          action.payload.data
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default orderSlice.reducer;
