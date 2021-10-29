import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TransferFundScreen from './TransferFundScreen';
import TransferDetailsScreen from './TransferDetailsScreen';
import TransferScanScreen from './TransferScanScreen';
import TransferStatus from './TransferStatus';

const Stack = createNativeStackNavigator();

/* =============================================================================
<TransferStack />
============================================================================= */
const TransferStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="TransferFund" component={TransferFundScreen} />
      <Stack.Screen name="TransferDetails" component={TransferDetailsScreen} />
      <Stack.Screen name="TransferScan" component={TransferScanScreen} />
      <Stack.Screen name="TransferStatus" component={TransferStatus} />
    </Stack.Navigator>
  );
};

/* Export
============================================================================= */
export default TransferStack;
