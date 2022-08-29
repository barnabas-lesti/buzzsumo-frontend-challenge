import en from './en.yaml';
import hu from './hu.yaml';

type Messages = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  en: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hu: Record<string, any>;
};

export default {
  en,
  hu,
} as Messages;
