import mockResponse from './mockResponse.json';

class Http {
  async get<T>(url: string): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResponse.topics as unknown as T), 500);
    });
  }
}

export default new Http();
