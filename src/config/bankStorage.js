import {Bank} from 'thenewboston';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_BANK = 'https://bank.keysign.app';
const BANKS_STORAGE_KEY = '@keysign/banks';
const ACTIVE_BANK_STORAGE_KEY = '@keysign/active_bank';

/**
 * Get bank nodes
 */
export const getBanks = async () => {
  const banksStr = await AsyncStorage.getItem(BANKS_STORAGE_KEY);
  let banks = banksStr ? JSON.parse(banksStr) : [];

  if (!banks.length) {
    banks = [DEFAULT_BANK];
    await AsyncStorage.setItem(BANKS_STORAGE_KEY, JSON.stringify(banks));
  }

  return banks;
};

/**
 * Create bank node
 */
export const createBank = async url => {
  const banks = await getBanks();

  if (banks.includes(url)) {
    throw new Error('Bank already exist!');
  }

  // Remove trailing slash
  if (url[url.length - 1] === '/') {
    url = url.slice(0, url.length - 1);
  }

  const bank = new Bank(url);
  await bank.getCleanStatus();
  banks.push(url);

  await AsyncStorage.setItem(BANKS_STORAGE_KEY, JSON.stringify(banks));
  return url;
};

/**
 * Delete bank node
 */
export const deleteBank = async url => {
  const banks = await getBanks();
  const remainingBanks = banks.filter(item => item !== url);

  await AsyncStorage.setItem(BANKS_STORAGE_KEY, JSON.stringify(remainingBanks));
  return url;
};

/**
 * Get active bank node
 */
export const getActiveBank = async () => {
  let activeBank = await AsyncStorage.getItem(ACTIVE_BANK_STORAGE_KEY);

  if (!activeBank) {
    activeBank = DEFAULT_BANK;
    await AsyncStorage.setItem(ACTIVE_BANK_STORAGE_KEY, DEFAULT_BANK);
  }

  return activeBank;
};

/**
 * Set active bank node
 */
export const setActiveBank = async url => {
  await AsyncStorage.setItem(ACTIVE_BANK_STORAGE_KEY, url);
  return url;
};

/**
 * Delete all bank nodes
 */
export const deleteAllBanks = async () => {
  await AsyncStorage.removeItem(BANKS_STORAGE_KEY);
  await AsyncStorage.removeItem(ACTIVE_BANK_STORAGE_KEY);
};
