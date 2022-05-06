export enum ResponseType {
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  DANGER = 'danger',
}

export interface ApiResponse<T> {
  data: {
    isSuccessful: boolean;
    type: ResponseType;
    data: T;
    message?: string | string[];
  }
}