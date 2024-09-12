import axios from "@/utils/axios";

export const getMenuPermissionByUserId = async (id) => {
  try {
    const response = await axios.get(`/auth/get-menu-by-user-id`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
