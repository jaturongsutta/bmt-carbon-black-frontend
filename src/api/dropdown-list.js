import axios from "@/utils/axios";

export const getPredefine = async (args) => {
  if (typeof args === "string") {
    return getPredefineByGroup(args);
  } else if (typeof args === "object") {
    return getPredefineJson(args);
  }
};

export const getMonth = async () => {
  const months = [
    { value: "1", title: "January" },
    { value: "2", title: "February" },
    { value: "3", title: "March" },
    { value: "4", title: "April" },
    { value: "5", title: "May" },
    { value: "6", title: "June" },
    { value: "7", title: "July" },
    { value: "8", title: "August" },
    { value: "9", title: "September" },
    { value: "10", title: "October" },
    { value: "11", title: "November" },
    { value: "12", title: "December" },
  ];

  return months;
};

export const getYear = async () => {
  const years = [];
  const currentYear = new Date().getFullYear();

  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push({ value: i, title: i });
  }

  return years;
};

export const line = async () => {
  try {
    const { data } = await axios.get(`dropdown-list/line`);
    return data;
  } catch (error) {
    throw error;
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
