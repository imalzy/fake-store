/* eslint-disable @typescript-eslint/no-explicit-any */
import { GLOBAL_CONFIG } from "../global-config";
import axios, {
  type AxiosRequestConfig,
  type AxiosError,
  type AxiosResponse,
} from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: GLOBAL_CONFIG.apiBaseUrl,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer Token";
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    if (!res.data)
      throw new Error("The interface request failed, please try again later!");
    if (res && res.data) {
      return res.data;
    }
    throw new Error("The interface request failed, please try again later!");
  },
  (error: AxiosError<any>) => {
    const { response, message } = error || {};
    const errMsg =
      response?.data?.message ||
      message ||
      "The interface request failed, please try again later!";
    toast.error(errMsg, { position: "top-center" });
    return Promise.reject(error);
  },
);

class APIClient {
  get<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  put<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
  delete<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return axiosInstance.request<any, T>(config);
  }
}

export default new APIClient();
