export class RequestResult<T> {
    error: string;
    success: boolean;
    details: string;
    body: string[];
    result: T;
  
    constructor() {
      this.error = '';
      this.success = false;
      this.details = '';
      this.body = [];
      this.result = null;
    }
  }
  