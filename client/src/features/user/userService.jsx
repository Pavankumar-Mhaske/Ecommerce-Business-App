import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/AxiosConfig";

// getUserWishList
const getUserWishList = async () => {
  const url = `${base_url}users/wishlist/`;
  const response = await axios.get(url, config);
  console.log("Response in userService is : ", response);

  return response.data;
};

//  getUserCart
const getUserCart = async () => {
  const url = `${base_url}users/cart/`;
  try {
    const response = await axios.get(url, config);
    // console.log("Response in userService is :💖 ", response);
    return response.data;
  } catch (error) {
    // console.log("error in userService is 💖💖💖💖💖💖💖💖💖💖: ", error);
    // console.log(
    //   "statusCode in userService is ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐: ",
    //   error?.response?.data?.statusCode
    // );
    const statusCode = error?.response?.data?.statusCode;
    if ([401, 403].includes(statusCode)) {
      alert(`JWT Expired, Please login again!`);
      localStorage.clear(); // Clear local storage on authentication issues
      window.location.href = "/login"; // Redirect to login page
      // window.location.reload();
    }
  }
};

const addItemOrUpdateItemQuantity = async (cartData) => {
  const { productId, quantity } = cartData;
  const url = `${base_url}cart/item/${productId}/`;
  const response = await axios.post(url, { quantity: quantity }, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

const removeItemFromCart = async (productId) => {
  const url = `${base_url}cart/item/${productId}/`;
  const response = await axios.delete(url, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

const createAddress = async (addressData) => {
  console.log("addressData in userService is : ", addressData);
  const url = `${base_url}addresses/`;
  const response = await axios.post(url, addressData, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

// get user orders
const getUserOrders = async () => {
  const url = `${base_url}users/user-orders/`;
  const response = await axios.get(url, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

// update user profile
// firstname, lastname, email, mobile, password
const updateUserProfile = async (userData) => {
  const url = `${base_url}users/update-user/`;
  const response = await axios.patch(url, userData, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

// forgotPasswordRequest
const forgotPasswordRequest = async (data) => {
  const url = `${base_url}users/forgot-password`;
  const response = await axios.post(url, data);
  console.log("Response in userService is : ", response);
  return response.data;
};

// resetForgottenPassword
const resetForgottenPassword = async (data) => {
  console.log("data in userService is : ", data);
  const { newPassword, resetToken } = data;
  const url = `${base_url}users/reset-password/${resetToken}/`;
  const response = await axios.post(url, { newPassword: newPassword }, config);
  console.log("Response in userService is : ", response);
  return response.data;
};

const UserService = {
  getUserWishList,
  getUserCart,
  addItemOrUpdateItemQuantity,
  removeItemFromCart,
  createAddress,
  getUserOrders,
  updateUserProfile,
  forgotPasswordRequest,
  resetForgottenPassword,
};

export default UserService; // export the service
