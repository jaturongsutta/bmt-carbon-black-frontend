import axios from "@/utils/axios";

export const getMenus = async (id) => {
  try {
    const response = await axios.get(`/menu/get-main-menu/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSearch = async (data) => {
  try {
    const response = await axios.post(`/menu/search`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMenuById = async (id) => {
  try {
    const response = await axios.get(`/menu/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveAdd = async (data) => {
  try {
    const response = await axios.post(`/menu/save`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveEdit = async (data) => {
  const response = await axios.put(`/menu/save/${data.menuNo}`, data);
  return response.data;
};

export const getMenuRouteByMenuNo = async (id) => {
  const response = await axios.get(`/menu-route/get-by-menu-no/${id}`);
  return response.data;
};

export const saveAddMenuRoute = async (data) => {
  try {
    const response = await axios.post(`/menu-route/save`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveEditMenuRoute = async (data) => {
  const response = await axios.put(
    `/menu-route/save/${data.menuRouteId}`,
    data
  );
  return response.data;
};

export const deleteMenuRoute = async (id) => {
  const response = await axios.delete(`/menu-route/delete/${id}`);
  return response.data;
};
