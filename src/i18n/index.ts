import { createI18n } from 'vue-i18n';

import messages from './messages';

const availableLocales = ['en', 'hu'];

export default createI18n({
  locale: availableLocales[0],
  fallbackLocale: availableLocales[0],
  availableLocales,
  messages,
});
