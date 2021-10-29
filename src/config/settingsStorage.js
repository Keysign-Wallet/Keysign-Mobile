import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_STORAGE_KEY = '@keysign/settings';

/**
 * Get settings
 */
export const getSettings = async () => {
  const settingsStr = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
  let settings = settingsStr && JSON.parse(settingsStr);

  if (!settings) {
    settings = {
      autoLock: 'default',
      idleLockTime: 60,
      language: null,
    };
    await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }

  return settings;
};

/**
 * Update settings
 */
export const updateSettings = async update => {
  let settings = await getSettings();

  settings = {
    ...settings,
    ...update,
  };
  await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));

  return settings;
};

/**
 * Delete all bank nodes
 */
export const deleteAllSettings = async () => {
  await AsyncStorage.removeItem(SETTINGS_STORAGE_KEY);
};
