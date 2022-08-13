import mockResponse from './mockResponse';

class Http {
  async get<T>(url: string): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResponse as unknown as T), 500);
    });
  }
}

export default new Http();
