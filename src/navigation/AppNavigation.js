import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import RNSplashScreen from 'react-native-splash-screen';
import {RootSiblingParent} from 'react-native-root-siblings';
import {InteractionManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import '../common';
import AutoLockListener from '../settings/components/AutoLockListener';
import HandshakeListener from '../handshake/components/HandshakeListener';
import BanksConfigListener from '../banks/components/BanksConfigListener';

import HomeTab from './HomeTab';
import AuthStack from '../auth/screens/AuthStack';
import WalletStack from '../wallet/screens/WalletStack';
import FriendsStack from '../friends/screens/FriendsStack';
import SettingsStack from '../settings/screens/SettingsStack';
import HistoryScreen from '../history/screens/HistoryScreen';
import TransferStack from '../transfer/screens/TransferStack';
import HandshakeStack from '../handshake/screens/HandshakeStack';
import ClearDataScreen from '../settings/screens/ClearDataScreen';

import * as Colors from '../config/colors';
import {getDeviceLocale, getLocaleMessages} from '../util/lang';

import {getAuthentication} from '../auth/redux/selectors';
import {getBanks as getBanksAction} from '../banks/redux/actions';
import {getSettings as selectSettings} from '../settings/redux/selectors';
import {getFriends as getFriendsAction} from '../friends/redux/actions';
import {getPassword as getPasswordAction} from '../auth/redux/actions';
import {
  getWallets as getWalletsAction,
  getSelectedWallet as getSelectedWalletAction,
} from '../wallet/redux/actions';
import {
  getSettings as getSettingsAction,
  updateSettings as updateSettingsAction,
} from '../settings/redux/actions';

const Stack = createNativeStackNavigator();

/* =============================================================================
<AppNavigation />
============================================================================= */
const AppNavigation = ({
  locale,
  authenticated,
  getBanks,
  getWallets,
  getFriends,
  getSettings,
  getPassword,
  updateSettings,
  getSelectedWallet,
}) => {
  const _navigation = useRef();
  const [initializing, setInitializing] = useState(true);

  // Initialize app
  useEffect(() => {
    const _initialize = async () => {
      await getPassword();
      await getSettings();
      await getWallets();
      await getSelectedWallet();
      await getFriends();
      await getBanks();
      setInitializing(false);
    };

    _initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set locale and hide splash screen
  useEffect(() => {
    (async () => {
      if (!initializing) {
        // Set device locale
        if (!locale) {
          await updateSettings({
            language: getDeviceLocale(),
          });
        }
        InteractionManager.runAfterInteractions(() => {
          RNSplashScreen.hide();
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializing]);

  return (
    <IntlProvider
      locale={locale}
      defaultLocale="en"
      messages={getLocaleMessages(locale)}>
      <RootSiblingParent>
        <NavigationContainer ref={_navigation} theme={THEME}>
          <AutoLockListener>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}>
              {authenticated ? (
                <>
                  <Stack.Screen name="HomeTab" component={HomeTab} />
                  <Stack.Screen
                    name="SettingsStack"
                    component={SettingsStack}
                  />
                  <Stack.Screen
                    name="TransferStack"
                    component={TransferStack}
                  />
                  <Stack.Screen name="History" component={HistoryScreen} />
                  <Stack.Screen name="WalletStack" component={WalletStack} />
                  <Stack.Screen name="FriendsStack" component={FriendsStack} />
                  <Stack.Screen
                    name="HandshakeStack"
                    component={HandshakeStack}
                  />
                  <Stack.Screen name="ClearData" component={ClearDataScreen} />
                </>
              ) : (
                <Stack.Screen name="Auth" component={AuthStack} />
              )}
            </Stack.Navigator>
          </AutoLockListener>
          <HandshakeListener navigation={_navigation.current} />
          <BanksConfigListener />
        </NavigationContainer>
      </RootSiblingParent>
    </IntlProvider>
  );
};

const THEME = {
  dark: false,
  colors: {
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.background,
    text: Colors.text,
    border: Colors.border,
    notification: Colors.secondary,
  },
};

const mapStateToProps = state => ({
  locale: selectSettings(state).language,
  authenticated: getAuthentication(state),
});

const mapDispatchToProps = {
  getBanks: getBanksAction,
  getWallets: getWalletsAction,
  getFriends: getFriendsAction,
  getSettings: getSettingsAction,
  getPassword: getPasswordAction,
  updateSettings: updateSettingsAction,
  getSelectedWallet: getSelectedWalletAction,
};

const propsAreEqual = (prevProps, nextProps) =>
  prevProps.locale === nextProps.locale &&
  prevProps.authenticated === nextProps.authenticated;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(AppNavigation, propsAreEqual));
