import {NativeModules, Platform} from 'react-native';

import {LOCALES, MESSAGES} from '../lang';

export const getDeviceLocale = () => {
  // IOS
  if (Platform.OS === 'ios') {
    const deviceLanguage =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0].split('_')[0];

    const supportedLanguage = LOCALES.find(
      item => item.value === deviceLanguage,
    );
    return supportedLanguage ? supportedLanguage.value : 'en';
  }
  // ANDROID
  if (Platform.OS === 'android') {
    const deviceLanguage =
      NativeModules.I18nManager.localeIdentifier.split('_')[0];

    const supportedLanguage = LOCALES.find(
      item => item.value === deviceLanguage,
    );
    return supportedLanguage ? supportedLanguage.value : 'en';
  }
  // DEFAULT
  return 'en';
};

/**
 * Get locale messages by ISO 639-1 code
 */
export const getLocaleMessages = locale => {
  const localeMessages = MESSAGES.find(item => item.label === locale);
  return localeMessages ? localeMessages.value : [];
};
