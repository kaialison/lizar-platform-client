import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

const apiClient = async (mode: "manage" | "grimm") => {
  const instance = axios.create({
    baseURL: mode === "manage" ? process.env.NEXT_PUBLIC_API_URL_MANAGE : process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

interface RequestParams {
  path: string;
  body?: object | any;
  params?: object;
  method: AxiosRequestConfig['method'],
  mode?: "manage" | "grimm"
}

export const handleError = (error: any) => {
  if (error.response?.data?.message && error.response?.status !== 401) {
    toast.error(error.response.data.message)
    return;
  }
  if (error?.code === "ERR_NETWORK") {
    // return toast.error('File tải lên quá lớn');
  }
  if (error.response) {
    toast.dismiss();
    // Yêu cầu đã được gửi và máy chủ đã phản hồi với mã trạng thái khác 2xx
    switch (error.response.status) {
      case 400:
        return toast.error('Yêu cầu không hợp lệ: Máy chủ không thể hiểu yêu cầu.');
      case 401:
        // get current url
        const currentUrl = window.location.href;
        // set current url to cookie
        Cookies.set('redirectUrl', currentUrl);
        // redirect to login  
        location.href = "/auth/sign-in?force=true";
        return toast.error('Chưa được xác thực: Xác thực thất bại hoặc người dùng không có quyền truy cập.');
      case 403:
        return toast.error('Bị cấm: Bạn không có quyền truy cập vào tài nguyên này.');
      case 413:
        return toast.error('File tải lên quá lớn');
      case 404:
        return toast.error('Không tìm thấy: Tài nguyên yêu cầu không thể tìm thấy.');
      case 500:
        return toast.error('Lỗi máy chủ nội bộ: Máy chủ gặp lỗi và không thể hoàn thành yêu cầu của bạn.');
      case 502:
        return toast.error('Cổng xấu: Máy chủ nhận được phản hồi không hợp lệ từ máy chủ phía trên.');
      case 503:
        return toast.error('Dịch vụ không khả dụng: Máy chủ hiện không thể xử lý yêu cầu do quá tải tạm thời hoặc bảo trì.');
      case 504:
        return toast.error('Hết thời gian chờ cổng: Máy chủ không nhận được phản hồi kịp thời từ máy chủ phía trên.');
      default:
        return toast.error('Đã xảy ra lỗi không mong muốn.');
    }
  } else if (error.request) {
    // Yêu cầu đã được gửi nhưng không nhận được phản hồi
    return toast.error('Không nhận được phản hồi từ máy chủ.');
  } else {
    return toast.error(`Lỗi: ${error.message}`);
  }
};

export const makeRequest = async ({ path, body, params, method = 'GET', mode = "grimm" }: RequestParams) => {
  const client = await apiClient(mode);

  const config: AxiosRequestConfig = {
    url: path,
    method,
    data: body,
    params,
    timeout: 600000,
  };

  try {
    const response = await client.request(config);
    return response.data;
  } catch (error) {
    // handleError(error as AxiosError);
  }
};
