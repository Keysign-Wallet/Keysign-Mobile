import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {useIntl} from 'react-intl';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Platform,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import {
  View,
  Text,
  Button,
  TextInput,
  Touchable,
  Container,
} from '../../common';
import AppLogo from '../../assets/icons/app-logo.svg';
import * as Colors from '../../config/colors';

import {getLoading} from '../redux/selectors';
import {createPassword as createPasswordAction} from '../redux/actions';

/* =============================================================================
<CreatePasswordScreen />
============================================================================= */
const CreatePasswordScreen = ({createPassword, loading}) => {
  const intl = useIntl();
  const insets = useSafeAreaInsets();
  const [secureNewPass, setSecureNewPass] = useState(true);
  const [secureConfirmPass, setSecureConfirmPass] = useState(true);
  const styles = geyStyles(insets);
  const CreatePasswordSchema = getCreatePasswordSchema(intl);

  const _handleSubmit = values => {
    createPassword(values.password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.select({ios: 'padding', android: undefined})}>
      <Container style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.applogoContainer}>
          <AppLogo />
        </View>
        <Text style={styles.titleTxt}>
          {intl.formatMessage({defaultMessage: 'Create Password'})}
        </Text>
        <Formik
          initialValues={{}}
          validationSchema={CreatePasswordSchema}
          onSubmit={_handleSubmit}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <>
              <TextInput
                value={values.password}
                errorText={errors.password}
                secureTextEntry={secureNewPass}
                placeholder={intl.formatMessage({
                  defaultMessage: 'New Password',
                })}
                right={
                  <Touchable
                    style={styles.eyeBtn}
                    onPress={() => setSecureNewPass(!secureNewPass)}>
                    <FontAwesome5Icon
                      name="eye"
                      color={
                        !secureNewPass ? Colors.primary : Colors.placeholder
                      }
                    />
                  </Touchable>
                }
                onBlur={handleBlur('password')}
                onChange={handleChange('password')}
              />
              <TextInput
                value={values.confirmPassword}
                errorText={errors.confirmPassword}
                secureTextEntry={secureConfirmPass}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Confirm Password',
                })}
                right={
                  <Touchable
                    style={styles.eyeBtn}
                    onPress={() => setSecureConfirmPass(!secureConfirmPass)}>
                    <FontAwesome5Icon
                      name="eye"
                      color={
                        !secureConfirmPass ? Colors.primary : Colors.placeholder
                      }
                    />
                  </Touchable>
                }
                onBlur={handleBlur('confirmPassword')}
                onChange={handleChange('confirmPassword')}
              />
              <Button
                style={styles.submitBtn}
                title={intl.formatMessage({defaultMessage: 'SUBMIT'})}
                loading={loading}
                disabled={loading}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </Container>
    </KeyboardAvoidingView>
  );
};

const getCreatePasswordSchema = intl =>
  Yup.object().shape({
    password: Yup.string()
      .min(
        8,
        intl.formatMessage({defaultMessage: 'Must be at least 8 characters!'}),
      )
      .max(
        100,
        intl.formatMessage({defaultMessage: 'Must not exceed 100 characters!'}),
      )
      .required(intl.formatMessage({defaultMessage: 'Must not be empty'})),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Both passwords must match!')
      .required(intl.formatMessage({defaultMessage: 'Must not be empty'})),
  });

const geyStyles = insets =>
  StyleSheet.create({
    keyboardView: {
      flex: 1,
    },
    container: {
      paddingHorizontal: 20,
      paddingTop: insets.top + 40,
    },
    applogoContainer: {
      opacity: 0.2,
      marginLeft: 10,
    },
    titleTxt: {
      fontSize: 18,
      fontFamily: 'Roboto-Bold',
      textAlign: 'center',
      marginTop: '10%',
      marginBottom: 9,
    },
    submitBtn: {
      marginTop: 50,
    },
    eyeBtn: {
      width: 40,
      height: 40,
      marginRight: -20,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  });

const mapStateToProps = state => ({
  loading: getLoading(state),
});

const mapDispatchToProps = {
  createPassword: createPasswordAction,
};

/* Export
============================================================================= */
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePasswordScreen);
