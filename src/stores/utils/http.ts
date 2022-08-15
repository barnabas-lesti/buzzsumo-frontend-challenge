import axios from 'axios';

import { env } from './env';

class Http {
  async get<T>(url: string): Promise<T> {
    if (!env.PROD && env.CLIENT_DEBUG_REQUEST_DELAY) {
      await this._sleep(env.CLIENT_DEBUG_REQUEST_DELAY);
    }

    const { data } = await axios.get(url);
    return data as T;
  }

  async _sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const http = new Http();
