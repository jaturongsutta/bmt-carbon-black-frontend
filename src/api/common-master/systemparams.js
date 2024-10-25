import axios from "@/utils/axios";

export const findbyType = async (key) => {
  return await axios.get(`/co-system-parameters/findbyType/${key}`);
};
