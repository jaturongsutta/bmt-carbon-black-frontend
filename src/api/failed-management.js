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
    const response = await axios.get(`/failed-management/getById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
