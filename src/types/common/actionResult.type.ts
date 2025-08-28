export interface SuccessResult<T = unknown> {
  success: true;
  message: string;
  data?: T; // 선택적으로 데이터 포함 가능
}

export interface FailResult {
  success: false;
  message: string;
}
