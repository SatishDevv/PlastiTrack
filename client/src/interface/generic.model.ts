export class AppStore<T> {
  result?: T | null | undefined;
  pending: boolean;
  error: any[];

  constructor() {
    this.pending = false;
    this.error = [];
  }
}

export interface IServiceResponse<T> {
  success: boolean;
  data: T;
  statusCode: number,
  errors: any[]
}


export interface IAxiosResponse<T> {
  data: T;
}
