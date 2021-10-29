import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useIntl} from 'react-intl';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

import {
  View,
  Text,
  Button,
  Container,
  TextInput,
  Touchable,
  FocusAwareStatusBar,
} from '../../common';
import AppLogo from '../../assets/icons/app-logo.svg';
import * as Colors from '../../config/colors';

import {getPassword} from '../redux/selectors';
import {login as loginAction} from '../redux/actions';

/* =============================================================================
<LoginScreen />
============================================================================= */
const LoginScreen = ({password, login}) => {
  const intl = useIntl();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [securePass, setSecurePass] = useState(true);
  const styles = geyStyles(insets);
  const LoginSchema = getLoginSchema(intl);

  const _handleTogglePress = () => {
    setSecurePass(!securePass);
  };

  const _handleSubmit = values => {
    if (values.password === password) {
      login();
    } else {
      Alert.alert(
        intl.formatMessage({defaultMessage: 'Login failed'}),
        intl.formatMessage({defaultMessage: 'Incorrect password provided'}),
      );
    }
  };

  const _handleForgotPassPress = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.select({ios: 'padding', android: undefined})}>
      <Container style={styles.container}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <View style={styles.applogoContainer}>
          <AppLogo />
          <Text style={styles.title}>
            {intl.formatMessage({defaultMessage: 'Keysign'})}
          </Text>
        </View>
        <Formik
          initialValues={{}}
          validationSchema={LoginSchema}
          onSubmit={_handleSubmit}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <>
              <TextInput
                value={values.password}
                errorText={errors.password}
                secureTextEntry={securePass}
                placeholder={intl.formatMessage({defaultMessage: 'Password'})}
                right={
                  <Touchable style={styles.eyeBtn} onPress={_handleTogglePress}>
                    <FontAwesome5Icon name="eye" color={Colors.placeholder} />
                  </Touchable>
                }
                onBlur={handleBlur('password')}
                onChange={handleChange('password')}
              />
              <Button
                title={intl.formatMessage({defaultMessage: 'SIGN IN'})}
                style={styles.signInBtn}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
        <Touchable onPress={_handleForgotPassPress}>
          <Text align="right" style={styles.forgotPassTxt}>
            {intl.formatMessage({defaultMessage: 'Forgot Password ?'})}
          </Text>
        </Touchable>
      </Container>
    </KeyboardAvoidingView>
  );
};

const getLoginSchema = intl =>
  Yup.object().shape({
    password: Yup.string().required(
      intl.formatMessage({defaultMessage: 'Must not be empty'}),
    ),
  });

const geyStyles = insets =>
  StyleSheet.create({
    keyboardView: {
      flex: 1,
    },
    container: {
      paddingHorizontal: 20,
      paddingTop: insets.top + 50,
    },
    applogoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      marginBottom: '30%',
    },
    title: {
      fontSize: 36,
      fontFamily: 'Roboto-Bold',
      marginLeft: 30,
    },
    eyeBtn: {
      width: 40,
      height: 40,
      marginRight: -20,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    signInBtn: {
      marginTop: 60,
      marginBottom: 30,
    },
    forgotPassTxt: {
      fontSize: 14,
      color: Colors.primary,
    },
  });

const mapStateToProps = state => ({
  password: getPassword(state),
});

const mapDispatchToProps = {
  login: loginAction,
};

/* Export
============================================================================= */
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
