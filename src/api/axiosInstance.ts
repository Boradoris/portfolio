import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { APIResponse } from "./type";
import { handleError } from "@/utils/error";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AI_REPORT_API_URL, // API 기본 URL
  // timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

// GET 요청 함수
export async function Get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<APIResponse<T>> = await axiosInstance.get<APIResponse<T>>(
      url,
      config
    );

    if (!response.data.success) {
      // API가 success가 아닌 응답을 보이면 error 객체를 throw 합니다.
      throw {
        status: response.status,
        code: response.data.code,
        message: response.data.message,
      };
    }

    return response.data.data;
  } catch (error: any) {
    return handleError(error);
  }
}

// POST 요청 함수
export async function Post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response: AxiosResponse<APIResponse<T>> = await axiosInstance.post<APIResponse<T>>(
      url,
      data,
      config
    );

    if (!response.data.success) {
      // API에서 실패 응답이면 code와 message를 담은 객체를 throw합니다.
      throw { status: response.status, code: response.data.code, message: response.data.message };
    }

    return response.data.data;
  } catch (error: any) {
    return handleError(error);
  }
}
