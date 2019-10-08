import I18n from '../i18n/i18n';
import { BASE_ROUTE } from './constants';

const performSearch = (query, translation, callback) => {
  fetch(BASE_ROUTE + '/iqra/search/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      arabicText: query,
      translation,
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
};

const changeTranslation = (translation, ayahs, callback) => {
  fetch(BASE_ROUTE + '/iqra/translations/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      translation,
      ayahs,
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
};

const contactDeveloper = (subject, email, message, callback) => {
  fetch('https://7gjflh9pwi.execute-api.us-east-1.amazonaws.com/production/contact-us', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject,
      email,
      message,
      receivers: [
        'info@tarteel.io',
        'info@iqraapp.com',
      ],
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
};

export {
  performSearch,
  changeTranslation,
  contactDeveloper,
};
