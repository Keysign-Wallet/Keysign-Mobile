import React from 'react';
import {connect} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import AppIntroScreen from './AppIntroScreen';
import CreatePasswordScreen from './CreatePasswordScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

import {getPassword} from '../redux/selectors';

const Stack = createNativeStackNavigator();

/* =============================================================================
<AuthStack />
============================================================================= */
const AuthStack = ({password}) => {
  return (
    <Stack.Navigator headerMode="none" screenOptions={{headerShown: false}}>
      {!password ? (
        <>
          <Stack.Screen name={'AppIntro'} component={AppIntroScreen} />
          <Stack.Screen
            name={'CreatePassword'}
            component={CreatePasswordScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={'Login'} component={LoginScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = state => ({
  password: getPassword(state),
});

/* Export
============================================================================= */
export default connect(mapStateToProps)(AuthStack);
