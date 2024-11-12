import axios from "@/utils/axios";
export const search = async (data) => {
  try {
    const response = await axios.post(
      `/production-daily-volumn-record/search`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(
      `/production-daily-volumn-record/get-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadFile = async (data) => {
  const response = await axios.post(
    `/production-daily-volumn-record/upload-file`,
    data
  );
  return response.data;
};

export const add = async (data) => {
  try {
    const response = await axios.post(
      `/production-daily-volumn-record/add`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id, data) => {
  try {
    const response = await axios.put(
      `/production-daily-volumn-record/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const response = await axios.delete(
      `/production-daily-volumn-record/delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const download = async (fileName) => {
  const response = await axios.post(
    `/production-daily-volumn-record/download`,
    {
      fileName,
    },
    {
      responseType: "blob",
    }
  );

  return response;
};
