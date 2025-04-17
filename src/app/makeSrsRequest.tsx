import axios from "axios";
import { redirect } from "next/navigation";

export async function makeSrsRequest({
  path,
  method = "GET",
  params = {},
  data = {},
  site = "pickleball"
}: {
  path: string;
  method?: string;
  params?: any;
  data?: any;
  site?: 'pickleball';
}, isAuth=true) {
  let url = "";
  try {
    // Set up the headers, including the Authorization header if accessToken exists
    const headers: any = {
      "Content-Type": "application/json",
    };

    // Make the request using
      url = `https://api-pickleball.butcher.io.vn/api/v1${path}`;


    const response = await axios({
      url,
      method,
      headers,
      params: {
        ...params,
      },
      data: method !== "GET" ? data : undefined,
    });

    return response.data;
  } catch (error: any) {
    console.error("Server request failed: ", url , params, error?.message);
    // throw error;
    return null;
  }
}


