import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AddWalletScreen from './AddWalletScreen';
import AccnSignKeyScreen from './AccnSignkeyScreen';
import GenerateWalletScreen from './GenerateWalletScreen';
import ImportKeysScreen from './ImportKeysScreen';
import ManageWalletScreen from './ManageWalletScreen';
import SyncScanScreen from './SyncScanScreen';
import SyncStatusScreen from './SyncStatusScreen';

const Stack = createNativeStackNavigator();

/* =============================================================================
<WalletStack />
============================================================================= */
const WalletStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="AddWallet" component={AddWalletScreen} />
      <Stack.Screen name="AccnSignKey" component={AccnSignKeyScreen} />
      <Stack.Screen name="GenerateWallet" component={GenerateWalletScreen} />
      <Stack.Screen name="ImportKeys" component={ImportKeysScreen} />
      <Stack.Screen name="ManageWallet" component={ManageWalletScreen} />
      <Stack.Screen name="SyncScan" component={SyncScanScreen} />
      <Stack.Screen name="SyncStatus" component={SyncStatusScreen} />
    </Stack.Navigator>
  );
};

/* Export
============================================================================= */
export default WalletStack;
