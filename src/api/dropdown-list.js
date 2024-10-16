import axios from "@/utils/axios";

export const getPredefine = async (args) => {
  if (typeof args === "string") {
    return getPredefineByGroup(args);
  } else if (typeof args === "object") {
    return getPredefineJson(args);
  }
};

export const lineTank = async () => {
  try {
    const { data } = await axios.get(`dropdown-list/line-tank`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const product = async () => {
  try {
    const { data } = await axios.get(`dropdown-list/product`);

    return data;
  } catch (error) {
    throw error;
  }
};

/// private function ///

const getPredefineByGroup = async (group) => {
  try {
    const response = await axios.get(`/dropdown-list/predefine-group/${group}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPredefineJson = async ({ group, sortby, sorttype }) => {
  try {
    const response = await axios.get(`/dropdown-list/predefine-group/${group}`);

    var data = response.data;
    if (sortby) {
      data = data.sort((a, b) => {
        if (!sorttype) {
          sorttype = "asc";
        }
        if (sorttype === "asc") {
          return a[sortby] > b[sortby] ? 1 : -1;
        } else {
          return a[sortby] < b[sortby] ? 1 : -1;
        }
      });
    }

    return data;
  } catch (error) {
    throw error;
  }
};
