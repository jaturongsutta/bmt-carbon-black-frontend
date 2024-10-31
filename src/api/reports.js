import axios from "@/utils/axios";
export const findbyReportType = async (key) => {
  return await axios.get(`/co-config-reports/findbyReportType/${key}`);
};
