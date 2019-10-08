import I18n from 'i18n-js';
import ar from './locales/ar';
import en from './locales/en';
import { NumberFormat, DateTimeFormat } from 'intl';
import 'intl/locale-data/jsonp/ar';

I18n.fallbacks = true;

I18n.translations = {
  ar,
  en,
};

// `Intl` exists, but it doesn't have the data we need, so load the
// polyfill and patch the constructors we need with the polyfill's.
Intl.NumberFormat   = NumberFormat;
Intl.DateTimeFormat = DateTimeFormat;

const arabicNumberFormatObj = new Intl.NumberFormat(['ar-EG']);

I18n.formatNumberForLocale = (number, locale) => {
  if (locale.substring(0, 2) === 'ar') {
    return arabicNumberFormatObj.format(number);
  } else {
    return number;
  }
};

export default I18n;
