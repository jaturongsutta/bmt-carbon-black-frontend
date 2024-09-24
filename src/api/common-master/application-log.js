import axios from "@/utils/axios";

export const search = async () => {
  try {
    const response = await axios.post(`/application-log/search`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getContentLog = async (type, filename) => {
  try {
    const response = await axios.get(
      `/application-log/content-log/${filename}/${type}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
