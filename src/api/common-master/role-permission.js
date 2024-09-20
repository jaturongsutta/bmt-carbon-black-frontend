import axios from "@/utils/axios";

export const search = async (data) => {
  try {
    const response = await axios.post(`/role-permission/search`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveAdd = async (data) => {
  return await axios.post(`/role-permission`, data);
};

export const saveEdit = async (data) => {
  return await axios.put(
    `/role-permission/${data.predefineGroup}/${data.predefineCd}`,
    data
  );
};

export const getById = async (predefineGroup, predefineCd) => {
  return await axios.get(`/role-permission/${predefineGroup}/${predefineCd}`);
};
