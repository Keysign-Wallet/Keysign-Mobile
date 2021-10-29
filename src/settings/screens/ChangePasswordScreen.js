import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {useIntl} from 'react-intl';
import {StyleSheet} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {
  Button,
  Content,
  TextInput,
  Touchable,
  Container,
  StackHeader,
} from '../../common';
import * as Colors from '../../config/colors';

import {getLoading} from '../../auth/redux/selectors';
import {getPassword} from '../../auth/redux/selectors';
import {changePassword as changePasswordAction} from '../../auth/redux/actions';

/* =============================================================================
<ChangePasswordScreen />
============================================================================= */
const ChangePasswordScreen = ({changePassword, loading, password}) => {
  const intl = useIntl();
  const [secureOldPass, setSecureOldPass] = useState(true);
  const [secureNewPass, setSecureNewPass] = useState(true);
  const [secureConfirmPass, setSecureConfirmPass] = useState(true);
  const ChangePasswordSchema = getChangePasswordSchema(intl, password);

  const _handleSubmit = values => {
    changePassword(values.oldPassword, values.password);
  };

  return (
    <Container>
      <StackHeader
        title={intl.formatMessage({defaultMessage: 'Change Password'})}
      />
      <Content style={styles.content}>
        <Formik
          initialValues={{}}
          validationSchema={ChangePasswordSchema}
          onSubmit={_handleSubmit}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <>
              <TextInput
                value={values.oldPassword}
                errorText={errors.oldPassword}
                secureTextEntry={secureOldPass}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Current Password',
                })}
                right={
                  <Touchable
                    style={styles.eyeBtn}
                    onPress={() => setSecureOldPass(!secureOldPass)}>
                    <FontAwesome5Icon
                      name="eye"
                      color={
                        !secureOldPass ? Colors.primary : Colors.placeholder
                      }
                    />
                  </Touchable>
                }
                onBlur={handleBlur('oldPassword')}
                onChange={handleChange('oldPassword')}
              />
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
                title={intl.formatMessage({defaultMessage: 'SAVE'})}
                loading={loading}
                disabled={loading}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

const getChangePasswordSchema = (intl, password) =>
  Yup.object().shape({
    oldPassword: Yup.string()
      .equals([password], 'Incorrect password')
      .required(intl.formatMessage({defaultMessage: 'Must not be empty'})),
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
      .oneOf(
        [Yup.ref('password')],
        intl.formatMessage({defaultMessage: 'Both passwords must match!'}),
      )
      .required(intl.formatMessage({defaultMessage: 'Must not be empty'})),
  });

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 17,
  },
  eyeBtn: {
    width: 40,
    height: 40,
    marginRight: -20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  submitBtn: {
    marginTop: 60,
  },
});

const mapStateToProps = state => ({
  password: getPassword(state),
  loading: getLoading(state),
});

const mapDispatchToProps = {
  changePassword: changePasswordAction,
};

/* Export
============================================================================= */
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordScreen);
