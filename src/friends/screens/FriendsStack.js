import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AddFriendScreen from './AddFriendScreen';
import ManageFriendsScreen from './ManageFriendsScreen';

const Stack = createNativeStackNavigator();

/* =============================================================================
<FriendsStack />
============================================================================= */
const FriendsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="AddFriend" component={AddFriendScreen} />
      <Stack.Screen name="ManageFriends" component={ManageFriendsScreen} />
    </Stack.Navigator>
  );
};

/* Export
============================================================================= */
export default FriendsStack;
