import axios from "@/utils/axios";
export const search = async (data) => {
  try {
    const response = await axios.post(`/tank-shipping/search`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
