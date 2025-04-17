import { API_PATHS } from "@/constants/apis";
import { makeRequest } from "@/utils/apiClient";
import { PaginationType } from "@/utils/types";


export const getLocationApi = async (params: PaginationType) => {
    const response = await makeRequest({
      path: API_PATHS.LOCATION.GET_LOCATION,
      method: "GET",
      params: params,
    });
    return response.data;
  };