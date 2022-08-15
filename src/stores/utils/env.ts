interface Environment extends ImportMetaEnv {
  CLIENT_TOPICS_API_URL: string;
  CLIENT_DEBUG_REQUEST_DELAY: number;
}

export const env = import.meta.env as Environment;
