export default {
  appName: 'ترتيل',
  // logo: 'الشعار',
  // mic: 'ميكروفون',
  tapOnMic: 'اضغط على الميكروفون و اسرد الآيه كامله او جزء منها',
  beginRecording: 'ابدء القراءة',
  nowRecording: 'يتم التسجيل...',
  doneRecording: 'انتهى تسجيل الصوت',

  // Search and results
  noSpeech: 'لم يتم اكتشاف أي قراءة. حاول مرة اخرى.',
  gettingMatch: 'يتم المطابقه',
  somethingWentWrong: 'حدث خطء',
  // serverConnectionLost: 'تم فقدان الإتصال بالخادوم',
  // cannotUnderstand: `لم نفهمك`,
  noMatches: 'لم نحصل على مطابقه',
  // tooManyResults: 'حصلنا على الكثير من النتائج؛ من بعضها',
  noInternetConnection: 'غير متصل بالإنترنت',
  resultCount: {
    one: 'نتيجة واحدة:',
    other: '{{count}} النتائج:',
  },

  // Recognition listener errors
  // errorNetworkTimeout: 'انقطع الإتصال بالشبكه',
  // errorNetwork: 'خطء في الشبكه',
  // errorAudio: 'خطء في الصوت',
  // errorServer: 'غير متصل بالإنترنت',
  // errorClient: 'حصل خطء',
  // errorSpeechTimeout: 'التسجيل كان طويل',
  // errorNoMatch: 'لم نحصل على مطابقه',
  // errorRecognizerBusy: 'الخادوم مزدحم، حاول مرة أخرى',
  // errorInsufficientPermissions: 'تصريح غير كاف',

  // Match results
  // chapterAndVerse: '%1$d:%2$d',
  // oneResultCount: 'النتيجه:',
  // underLimitResultCount: '%1$d results:',
  // resultCount: '%1$d results (not all shown):',

  // Settings
  settingsTitle: 'خيارات',
  settingsTranslation: 'الترجمة',
  settingsLanguage: 'اللغة',
  // save: 'Save',

  // About
  aboutTitle: 'عن هذا البرنامج',
  aboutParagraph:
`\
ترتيل برنامج مجاني موجه للمسلمين كمصدر لتحديد مواقع و الرجوع لأجزاء من القرآن الكريم من خلال تقنيه تمييز الصوت. لا تنسى المساهمين في تطوير البرنامج من دعائك.
`
  ,

  // Contact
  contactTitle: 'تواصل مع المطور',
  contactFormSubject: 'موضوع',
  contactFormSubject1: 'تقرير الشوائب',
  contactFormSubject2: 'سؤال',
  contactFormSubject3: 'طلب المواصفات',
  contactFormSubject4: 'شراكة',
  contactFormSubject5: 'آخر',
  contactFormEmail: 'البريد الإكتروني',
  contactFormMessage: 'الرساله',
  contactFormSend: 'ارسل',
  noEmailEntered: 'لم يتم ادخال البريد الإكتروني',
  noMessageEntered: 'لم يتم ادخال رساله',
  noSubjectSelected: 'لم يتم تحديد موضوع',
  // sendingMessage: 'يتم ارسال رسالتك',
  messageSent: 'تم ارسال رسالتك',

  // Privacy Policy
  privacyTitle: 'سياسة الخصوصية',

  // Permissions
  // internet: 'إمكانية دخول كاملة إلى الشبكة',
  // recordAudio: 'تسجيل الصوت',
  speechRecognition: 'التعرف على الكلام',
  microphone: 'الميكروفون',
  missingPermissionTitle: 'تصريح مفقود',
  missingPermissionExplanation: 'تم رفض الوصول «{{permissionName}}» يرجى منح الوصول من الإعدادات.',
  // disabledGoogleAppTitle: 'تم تعطيل الباقة!',
  // disabledGoogleAppExplanation: `
  //   من أجل استخدام هذا التطبيق، يتوجب عليك تفعيل تطبيق جوجل «Google». من فضلك قم بتفعيل التطبيق من خلال قسم التطبيقات في قائمة الإعدادات الخاصة بجهازك.
  // `,
  ok: 'موافق',
  openSettings: 'أفتح الإعدادات',
  // missingGoogleAppTitle: 'الباقة المطلوبة مفقودة!',
  // missingGoogleAppExplanation: '«Google» من أجل استخدام هذا التطبيق، يتوجب عليك تحميل تطبيق بحث جوجل',
  // download: 'تحميل',

  // Share
  actionShare: 'شارك',
  shareWith: 'شارك على...',
  shareSubject: 'برنامج ترتيل',
  shareMessage: 'جرب هذا البرنامج الرائع «ترتيل». حمل البرنامج من هنا: https://tarteel.io/mobile',
  shareInstructions: 'حدد كل المواد التي تود ضمها إلى رسالتك:',
  shareArabicAyah: 'الآيه بالعربي',
  shareTranslationAyah: 'الآيه مترجمه',
  // nothingToShare: 'لم تختر اي شئ للمشاركه',
  // ayahTranslated: 'ayah',
  // ayahInArabic: 'الآيه',
  fullAyahShareMessage: '{{arabicAyah}}\n({{arabicSurahName}}، الآيه {{arabicAyahNum}})\n\n{{translationAyah}}\n({{translationSurahName}}, verse {{ayahNum}})',
  arabicAyahShareMessage: '{{arabicAyah}}\n({{arabicSurahName}}، الآيه {{arabicAyahNum}})',
  translationAyahShareMessage: '{{translationAyah}}\n({{translationSurahName}}, verse {{ayahNum}})',
  quran: 'القرآن الكريم',

  // Translations
  'en-sahih': '(EN) صحيح إنترناشيونال',
  'en-arberry': '(EN) آرثر آربري',
  'en-asad': '(EN) محمد أسد',
  'en-daryabadi': '(EN) عبد الماجد دريابادي',
  'en-hilali': '(EN) محمد تقي الدين الهلالي ومحمد محسن خان',
  'en-pickthall': '(EN) محمد مارمادوك بكتال',
  'en-qaribullah': '(EN) البروفيسور الشيخ حسن الفاتح قريب الله',
  'en-sarwar': '(EN) محمد سرور‎',
  'en-yusufali': '(EN) عبد الله يوسف علي',
  'en-maududi': '(EN) أبو الأعلى المودودي',
  'en-shakir': '(EN) محمد حبيب شاكر',
  'en-transliteration': '(EN)  النقل الحرفي',

  // Languages
  en: 'English',
  ar: 'العربية',
};
