import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PreferencesScreen from './PreferencesScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import AutoLockScreen from './AutoLockScreen';
import ImportExportScreen from './ImportExportScreen';
import AboutKeysignScreen from './AboutKeysignScreen';
import AddBankScreen from './AddBankScreen';

const Stack = createNativeStackNavigator();

/* =============================================================================
<SettingsStack />
============================================================================= */
const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      {/* Preferences screen */}
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="AddBank" component={AddBankScreen} />
      {/* Change Password screen */}
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      {/* Auto Lock screen */}
      <Stack.Screen name="AutoLock" component={AutoLockScreen} />
      {/* Import/Export screen */}
      <Stack.Screen name="ImportExport" component={ImportExportScreen} />
      {/* About Keysign screen */}
      <Stack.Screen name="AboutKeysign" component={AboutKeysignScreen} />
    </Stack.Navigator>
  );
};

/* Export
============================================================================= */
export default SettingsStack;
