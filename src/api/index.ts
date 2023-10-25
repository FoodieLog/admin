import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const setAuthTokenInterceptor = (config: any) => {
  const accessToken = localStorage.getItem("admin-token");

  // headers에 기본값 설정
  config.headers = config.headers || {};

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

export const userRequest = axios.create(axiosConfig);
export const authRequest = axios.create(axiosConfig);

// 각 axios 인스턴스에 인터셉터 적용
userRequest.interceptors.request.use(setAuthTokenInterceptor);
