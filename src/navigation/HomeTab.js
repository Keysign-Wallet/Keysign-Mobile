import React from 'react';
import {useIntl} from 'react-intl';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from './TabBar';
import HomeScreen from '../home/screens/HomeScreen';
import WalletScreen from '../wallet/screens/WalletScreen';
import SettingsScreen from '../settings/screens/SettingsScreen';
import ScanScreen from '../scan/screens/ScanScreen';

const Tab = createBottomTabNavigator();

/* =============================================================================
<HomeTab />
============================================================================= */
const HomeTab = () => {
  const intl = useIntl();

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: intl.formatMessage({defaultMessage: 'Home'})}}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{title: intl.formatMessage({defaultMessage: 'Wallet'})}}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{title: intl.formatMessage({defaultMessage: 'Scan'})}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: intl.formatMessage({defaultMessage: 'Settings'})}}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
