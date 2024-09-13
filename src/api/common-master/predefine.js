import axios from "@/utils/axios";

export const search = async (data) => {
  try {
    const response = await axios.post(`/predefine/search`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveAdd = async (data) => {
  return await axios.post(`/predefine`, data);
};

export const saveEdit = async (data) => {
  return await axios.put(
    `/predefine/${data.predefineGroup}/${data.predefineCd}`,
    data
  );
};

export const getById = async (predefineGroup, predefineCd) => {
  return await axios.get(`/predefine/${predefineGroup}/${predefineCd}`);
};
