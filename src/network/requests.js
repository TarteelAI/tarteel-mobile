import Config from 'react-native-config';
import I18n from '../i18n/i18n';
import { BASE_ROUTE } from './constants';

const performSearch = (query, translation, callback) => {
  fetch(BASE_ROUTE + '/v3.0/search', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      arabicText: query,
      translation,
      apikey: Config.IQRA_API_KEY,
    }),
  })
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    const error = new Error(response.statusText || I18n.t('somethingWentWrong'));
    throw error;
  })
  .then(responseJson => {
    callback(null, responseJson);
  })
  .catch(error => {
    callback(error, null);
  });
}

const changeTranslation = (translation, ayahs, callback) => {
  fetch(BASE_ROUTE + '/v3.0/translations', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      translation,
      ayahs,
      apikey: Config.IQRA_API_KEY,
    }),
  })
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    const error = new Error(response.statusText || I18n.t('somethingWentWrong'));
    throw error;
  })
  .then(responseJson => {
    callback(null, responseJson);
  })
  .catch(error => {
    callback(error, null);
  });
}

const contactDeveloper = (name, email, message, callback) => {
  fetch(BASE_ROUTE + '/v1.0/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      message,
      apikey: Config.IQRA_API_KEY,
    }),
  })
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    const error = new Error(response.statusText || I18n.t('somethingWentWrong'));
    throw error;
  })
  .then(responseJson => {
    callback(null, responseJson);
  })
  .catch(error => {
    callback(error, null);
  });
}

export {
  performSearch,
  changeTranslation,
  contactDeveloper,
}
