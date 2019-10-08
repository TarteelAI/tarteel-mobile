import { Platform } from 'react-native';
import { Crashlytics } from 'react-native-fabric';

const logError = (error) => {
  if (Platform.OS === 'ios') {
    // Record a non-fatal JS error only on iOS
    Crashlytics.recordError(error);
  } else {
    // Record a non-fatal JS error only on Android
    Crashlytics.logException(error);
  }
};

export {
  logError,
};
