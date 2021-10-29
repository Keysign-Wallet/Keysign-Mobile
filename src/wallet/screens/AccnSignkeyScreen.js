import React from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {useIntl} from 'react-intl';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Button, Container, StackHeader, TextInput, View} from '../../common';
import WalletRound from '../../assets/icons/wallet-roundBackground.svg';
import KeyRound from '../../assets/icons/key-roundBackground.svg';

import {getLoading} from '../redux/selectors';
import {createWallet as createWalletAction} from '../redux/actions';

/* =============================================================================
<AccnSignKeyScreen />
============================================================================= */
const AccnSignKeyScreen = ({loading, createWallet}) => {
  const intl = useIntl();
  const navigation = useNavigation();
  const AccnSignKeyWalletSchema = getAccnSignKeyWalletSchema(intl);

  const _handleSubmit = values => {
    createWallet(values.name, values.signingKey, () => {
      navigation.navigate('Wallet');
    });
  };

  return (
    <Container>
      <StackHeader
        type="secondary"
        title={intl.formatMessage({defaultMessage: 'Use Acc/Signkey'})}
      />
      <Formik
        initialValues={{}}
        validationSchema={AccnSignKeyWalletSchema}
        onSubmit={_handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, errors, values}) => (
          <View style={styles.contentContainer}>
            <TextInput
              left={<WalletRound />}
              value={values.name}
              errorText={errors.name}
              placeholder={intl.formatMessage({defaultMessage: 'Wallet Name'})}
              onBlur={handleBlur('name')}
              onChange={handleChange('name')}
            />
            <TextInput
              left={<KeyRound />}
              value={values.signingKey}
              errorText={errors.signingKey}
              placeholder={intl.formatMessage({defaultMessage: 'Signing Key'})}
              onBlur={handleBlur('signingKey')}
              onChange={handleChange('signingKey')}
            />
            <Button
              style={styles.submitBtn}
              title={intl.formatMessage({defaultMessage: 'IMPORT KEYS'})}
              loading={loading}
              disabled={loading}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </Container>
  );
};

const getAccnSignKeyWalletSchema = intl =>
  Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[\p{L}\p{N}\s]+$/u,
        intl.formatMessage({
          defaultMessage: 'Only numbers and letters allowed',
        }),
      )
      .min(
        3,
        intl.formatMessage({defaultMessage: 'Must be at least 3 characters!'}),
      )
      .max(
        12,
        intl.formatMessage({defaultMessage: 'Must not exceed 12 characters!'}),
      )
      .required(intl.formatMessage({defaultMessage: 'Must not be empty'})),
    signingKey: Yup.string().required(
      intl.formatMessage({defaultMessage: 'Must not be empty'}),
    ),
  });

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 17,
  },
  submitBtn: {
    marginTop: 60,
  },
});

const mapStateToProps = state => ({
  loading: getLoading(state),
});

const mapDispatchToProps = {
  createWallet: createWalletAction,
};

/* Export
============================================================================= */
export default connect(mapStateToProps, mapDispatchToProps)(AccnSignKeyScreen);
