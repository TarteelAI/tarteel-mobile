export default {
  appName: 'Tarteel',
  // logo: 'Logo',
  // mic: 'mic',
  tapOnMic: 'Tap on the mic and recite a full or partial verse',
  beginRecording: 'Please begin reciting',
  nowRecording: 'Recording...',
  doneRecording: 'Speech recording ended',

  // Search and results
  noSpeech: 'No recitation detected. Please try again.',
  gettingMatch: 'Getting match',
  somethingWentWrong: 'Sorry, something went wrong',
  // serverConnectionLost: 'Sorry, server connection lost',
  // cannotUnderstand: `Sorry, we couldn't understand you`,
  noMatches: 'No matches were found',
  // tooManyResults: 'Too many results; not all shown',
  noInternetConnection: 'No internet connection',
  resultCount: {
    one: '{{count}} result:',
    other: '{{count}} results:',
  },
  ayahIndex: '{{surahNum}}:{{ayahNum}}',

  // Recognition listener errors
  // errorNetworkTimeout: 'Network timeout',
  // errorNetwork: 'Network error',
  // errorAudio: 'Audio error',
  // errorServer: 'No internet connection',
  // errorClient: 'Client error',
  // errorSpeechTimeout: 'Speech timed out',
  // errorNoMatch: 'No match',
  // errorRecognizerBusy: 'Service was busy, please try again',
  // errorInsufficientPermissions: 'Insufficient permissions',

  // Match results
  // chapterAndVerse: '%1$d:%2$d',
  // oneResultCount: '1 result:',
  // underLimitResultCount: '%1$d results:',
  // resultCount: '%1$d results (not all shown):',

  // Settings
  settingsTitle: 'Settings',
  settingsTranslation: 'Translation',
  settingsLanguage: 'Language',
  // save: 'Save',

  // About
  aboutTitle: 'About this app',
  aboutParagraph:
`\
Tarteel is a free application meant to provide Muslims with a \
resource for locating and referencing pieces of the Quran through speech recognition. \
Please keep its contributors in your prayers. \
\n\nThe logo of this app is designed by Razan Qaoud and the app designs were made by \
Thamjeeth Abdul Gaffoor. Arabic translation was done by Mohammed Fahad. \
\n\nCredit is also due to all of the people who have contributed to the \
projects Alfanous and Tanzil.net.\
`
  ,

  // Contact
  contactTitle: 'Contact the developer',
  contactParagraph: `\
Have some feedback or a feature request? Found a bug? Interested in reaching the developer? \
To get in touch, send a message below. Note that the "name" and "email" fields only need to \
be filled in if you would like to be able to receive a reply.\
  `,
  contactFormName: 'Name',
  contactFormEmail: 'Email',
  contactFormMessage: 'Message',
  contactFormSend: 'Send',
  noMessageEntered: 'No message entered',
  // sendingMessage: 'Sending message',
  messageSent: 'Message sent',

  // Privacy Policy
  privacyTitle: 'Privacy Policy',

  // Permissions
  // internet: 'Internet',
  // recordAudio: 'Record Audio',
  speechRecognition: 'Speech Recognition',
  microphone: 'Microphone',
  missingPermissionTitle: 'Missing Permission!',
  missingPermissionExplanation: `\
The action you are trying to do requires the "{{permissionName}}" permission. \
Please allow this app to access that permission through the settings section of your device.\
  `,
  // disabledGoogleAppTitle: 'Disabled Package!',
  // disabledGoogleAppExplanation: `
  //   In order to use this app, you must have the Google app enabled. Please enable the Google app through the
  //   &quot;applications&quot; section of your device's settings.
  // `,
  ok: 'OK',
  openSettings: 'Open Settings',
  // missingGoogleAppTitle: 'Missing Package!',
  // missingGoogleAppExplanation: 'In order to use this app, you must have the Google search app installed.',
  // download: 'Download',

  // Share
  actionShare: 'Share',
  shareWith: 'Share with...',
  shareSubject: 'Tarteel app',
  shareMessage: `Check out this amazing app I've been using called Tarteel! Download it here: https://tarteel.io/mobile`,
  shareInstructions: 'Select all of the items you want to include in the shared message:',
  shareArabicAyah: 'Arabic ayah',
  shareTranslationAyah: 'Translated ayah',
  // nothingToShare: 'You have not selected anything to share',
  // ayahTranslated: 'ayah',
  // ayahInArabic: 'الآيه',
  fullAyahShareMessage: '{{arabicAyah}}\n({{arabicSurahName}}، الآيه {{arabicAyahNum}})\n\n{{translationAyah}}\n({{translationSurahName}}, verse {{ayahNum}})',
  arabicAyahShareMessage: '{{arabicAyah}}\n({{arabicSurahName}}، الآيه {{arabicAyahNum}})',
  translationAyahShareMessage: '{{translationAyah}}\n({{translationSurahName}}, verse {{ayahNum}})',
  quran: 'Holy Quran',

  // Translations
  'en-sahih': '(EN) Sahih International',
  'en-arberry': '(EN) A. J. Arberry',
  'en-asad': '(EN) Muhammad Asad',
  'en-daryabadi': '(EN) Abdul Majid Daryabadi',
  'en-hilali': '(EN) Dr. Muhammad Taqi-ud-Din al-Hilali and Dr. Muhammad Muhsin Khan',
  'en-pickthall': '(EN) Mohammed Marmaduke William Pickthall',
  'en-qaribullah': '(EN) Professor Shaykh Hasan Al-Fatih Qaribullah',
  'en-sarwar': '(EN) Muhammad Sarwar',
  'en-yusufali': '(EN) Abdullah Yusuf Ali',
  'en-maududi': '(EN) Sayyid Abul Ala Maududi',
  'en-shakir': '(EN) Mohammad Habib Shakir',
  'en-transliteration': '(EN) Transliteration',

  // Languages
  en: 'English',
  ar: 'العربية',
};
