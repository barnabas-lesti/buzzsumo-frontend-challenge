import axios from 'axios';

import { env } from './env';

class Http {
  /**
   * Executes a GET request to the given `url`. Also delays the request in
   * non-prod when `CLIENT_DEBUG_REQUEST_DELAY` is set.
   * @param url URL of the request.
   */
  async get<T>(url: string): Promise<T> {
    if (!env.PROD && env.CLIENT_DEBUG_REQUEST_DELAY) {
      await this._sleep(env.CLIENT_DEBUG_REQUEST_DELAY);
    }

    const { data } = await axios.get(url);
    return data as T;
  }

  /**
   * Can be used to delay a request response in non-prod.
   * @param ms Amount of time to wait.
   * @private
   */
  async _sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Application HTTP wrapper.
 */
export const http = new Http();
