import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HandshakeTransferScreen from './HandshakeTransferScreen';
import HandshakeVerifyScreen from './HandshakeVerifyScreen';
import HandshakeStatus from './HandshakeStatus';

const Stack = createNativeStackNavigator();

/* =============================================================================
<HandshakeStack />
============================================================================= */
const HandshakeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="HandshakeVerify" component={HandshakeVerifyScreen} />
      <Stack.Screen
        name="HandshakeTransfer"
        component={HandshakeTransferScreen}
      />
      <Stack.Screen name="HandshakeStatus" component={HandshakeStatus} />
    </Stack.Navigator>
  );
};

/* Export
============================================================================= */
export default HandshakeStack;
