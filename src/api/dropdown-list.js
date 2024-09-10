import axios from "@/utils/axios";

export default {
  getPredefine: async (args) => {
    if (typeof args === "string") {
      return getPredefineByGroup(args);
    } else if (typeof args === "object") {
      return getPredefineJson(args);
    }
  },
};

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
