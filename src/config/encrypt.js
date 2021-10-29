import CryptoJS from 'react-native-crypto-js';

export const encrypt = (key, value) => {
  const encryptedValue = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    key,
  ).toString();
  return encryptedValue;
};

export const decrypt = (key, value) => {
  const bytes = CryptoJS.AES.decrypt(value, key);
  let decryptedValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedValue;
};
