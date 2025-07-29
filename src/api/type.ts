// 공통 응답 타입
interface SuccessResponse<T> {
  success: true;
  data: T;
}
interface FailResponse {
  success: false;
  code: string;
  message: string;
}

export type APIResponse<T> = SuccessResponse<T> | FailResponse;
