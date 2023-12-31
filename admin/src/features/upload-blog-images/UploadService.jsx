import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Token } from "../Token";

const uploadImages = async (data) => {
  const token = Token;
  // console.log("token in uploadService is : ", token);
  // console.log("data in uploadService is : ", data);
  const url = `${base_url}blogs/upload/`;
  const response = await axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log("response in uploadService is : ", response);
  return response.data;
};

const deleteImages = async (id) => {
  const token = Token;
  // console.log("token in deleteService is : ", token);
  // console.log("id in deleteService is : ", id);
  const url = `${base_url}blogs/delete/${id}`;
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log("response in deleteService is : ", response);
  return response.data;
};

const uploadService = {
  uploadImages,
  deleteImages,
};

export default uploadService; // export the service
