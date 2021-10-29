import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@keysign/friends';

/**
 * Get friend list
 */
export const getFriends = async () => {
  const friendsEncrypted = await AsyncStorage.getItem(STORAGE_KEY);
  const friends = friendsEncrypted ? JSON.parse(friendsEncrypted) : [];
  return friends;
};

/**
 * Create friend with name and account number
 */
export const createFriend = async (name, accountNo) => {
  const friends = await getFriends();

  const friend = {
    id: accountNo,
    name,
    createdAt: new Date(),
  };
  friends.push(friend);

  const friendsEncrypted = JSON.stringify(friends);
  await AsyncStorage.setItem(STORAGE_KEY, friendsEncrypted);

  return friend;
};

/**
 * Delete friend by id (account number)
 */
export const deleteFriend = async id => {
  const friends = await getFriends();
  const remainingFriends = friends.filter(item => item.id !== id);

  const friendsEncrypted = JSON.stringify(remainingFriends);
  await AsyncStorage.setItem(STORAGE_KEY, friendsEncrypted);

  return {id};
};

/**
 * Delete all friends
 */
export const deleteAllFriends = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
