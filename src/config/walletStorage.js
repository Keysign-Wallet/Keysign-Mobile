import RNFS from 'react-native-fs';
import {Account} from 'thenewboston';
import {PermissionsAndroid, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {encrypt, decrypt} from './encrypt';

const STORAGE_KEY = '@keysign/wallets';

/**
 * Get wallet list
 */
export const getWallets = async mk => {
  const walletsEncrypted = await AsyncStorage.getItem(STORAGE_KEY);
  const wallets = walletsEncrypted ? decrypt(mk, walletsEncrypted) : [];
  return wallets;
};

/**
 * Create wallet with name and signing key (optional)
 */
export const createWallet = async (mk, name, signingKey) => {
  const wallets = await getWallets(mk);
  const account = signingKey ? new Account(signingKey) : new Account();

  const wallet = {
    id: account.accountNumberHex,
    name,
    signingKey: account.signingKeyHex,
    createdAt: new Date(),
  };
  wallets.push(wallet);

  const walletsEncrypted = encrypt(mk, wallets);
  await AsyncStorage.setItem(STORAGE_KEY, walletsEncrypted);

  return wallet;
};

/**
 * Delete wallet by id (account number)
 */
export const deleteWallet = async (mk, id) => {
  const wallets = await getWallets(mk);
  const remainingWallets = wallets.filter(item => item.id !== id);

  const walletsEncrypted = encrypt(mk, remainingWallets);
  await AsyncStorage.setItem(STORAGE_KEY, walletsEncrypted);

  return {id};
};

/**
 * Sync wallets
 */
export const syncWallets = async (mk, data) => {
  const wallets = await getWallets(mk);
  // Safety check for double parsing
  const json = JSON.parse(data);
  const walletsDict = typeof json === 'string' ? JSON.parse(json) : json;

  for (const wallet in walletsDict) {
    if (!wallets.find(item => item.signingKey === walletsDict[wallet])) {
      const account = new Account(walletsDict[wallet]);
      wallets.push({
        id: account.accountNumberHex,
        name: wallet,
        signingKey: account.signingKeyHex,
        createdAt: new Date(),
      });
    }
  }

  const walletsEncrypted = encrypt(mk, wallets);
  await AsyncStorage.setItem(STORAGE_KEY, walletsEncrypted);

  return wallets;
};

/**
 * Import wallets
 */
export const importWallets = async (mk, file) => {
  const importedWalletsStr = await RNFS.readFile(file.uri, 'utf8');
  const importedWallets = decrypt(mk, importedWalletsStr);
  const wallets = await getWallets(mk);

  for (const wallet in importedWallets) {
    if (!wallets.find(item => item.signingKey === importedWallets[wallet])) {
      const account = new Account(importedWallets[wallet]);
      wallets.push({
        id: account.accountNumberHex,
        name: wallet,
        signingKey: account.signingKeyHex,
        createdAt: new Date(),
      });
    }
  }

  const walletsEncrypted = encrypt(mk, wallets);
  await AsyncStorage.setItem(STORAGE_KEY, walletsEncrypted);

  return wallets;
};

/**
 * Export wallets
 */
export const exportWallets = async mk => {
  // Get wallets in export format
  const wallets = await getWallets(mk);
  const walletsDict = {};
  wallets.forEach(wallet => {
    walletsDict[wallet.name] = wallet.signingKey;
  });
  const walletsEncrypted = encrypt(mk, walletsDict);

  // Save wallets to document directory of Keysign
  const fileName = `keysign-wallets-${Date.now()}.txt`;
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ).then(result => result === 'granted');

    if (!granted) {
      throw new Error('Permission Denied');
    }

    const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    await RNFS.writeFile(path, walletsEncrypted, 'utf8');

    return {
      uri: path,
      type: 'text/plain',
      name: fileName,
    };
  }

  const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  await RNFS.writeFile(path, walletsEncrypted, 'utf8');

  return {
    uri: path,
    type: 'text/plain',
    name: fileName,
  };
};

/**
 * Update master key
 */
export const updateMasterKey = async (oldMasterKey, currentMasterKey) => {
  const walletsEncrypted = await AsyncStorage.getItem(STORAGE_KEY);
  if (walletsEncrypted) {
    const walletsDecrypted = decrypt(oldMasterKey, walletsEncrypted);
    await AsyncStorage.setItem(
      STORAGE_KEY,
      encrypt(currentMasterKey, walletsDecrypted),
    );
  }
};

/**
 * Delete all wallets
 */
export const deleteAllWallets = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
