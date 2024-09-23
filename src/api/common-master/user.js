import axios from "@/utils/axios";

export const search = async (data) => {
  try {
    const response = await axios.post(`/user/search`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (data) => {
  try {
    const response = await axios.post(`/user`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axios.put(`/user/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
