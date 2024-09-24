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
  const response = await axios.post(`/role-permission`, data);
  return response.data;
};

export const saveEdit = async (id, data) => {
  const response = await axios.put(`/role-permission/${id}`, data);
  return response.data;
};

export const getById = async (roleId) => {
  return await axios.get(`/role-permission/load-role-permission/${roleId}`);
};
