import axios from "@/utils/axios";
export const search = async (data) => {
  try {
    const response = await axios.post(`/tank-shipping/search`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`/tank-shipping/getById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdjectValue = async (data) => {
  try {
    const response = await axios.post(`/tank-shipping/getAdjectValue`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const add = async (data) => {
  try {
    const response = await axios.post(`/tank-shipping/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id, data) => {
  try {
    const response = await axios.put(`/tank-shipping/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const response = await axios.delete(`/tank-shipping/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
