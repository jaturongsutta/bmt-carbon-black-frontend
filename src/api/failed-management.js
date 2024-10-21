import axios from "@/utils/axios";
export const search = async (data) => {
  try {
    const response = await axios.post(`/failed-management/search`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`/failed-management/get-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductWeight = async (line, productName) => {
  try {
    const response = await axios.get(
      `/failed-management/get-product-weight/${line}/${productName}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const add = async (data) => {
  try {
    const response = await axios.post(`/failed-management/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id, data) => {
  try {
    const response = await axios.put(`/failed-management/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const response = await axios.delete(`/failed-management/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
