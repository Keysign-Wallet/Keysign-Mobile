import React from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {useIntl} from 'react-intl';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Button, Container, StackHeader, TextInput, View} from '../../common';

import WalletRound from '../../assets/icons/wallet-roundBackground.svg';

import {getLoading} from '../redux/selectors';
import {createWallet as createWalletAction} from '../redux/actions';

/* =============================================================================
<GenerateWalletScreen />
============================================================================= */
const GenerateWalletScreen = ({loading, createWallet}) => {
  const intl = useIntl();
  const navigation = useNavigation();
  const GenerateWalletSchema = getGenerateWalletSchema(intl);

  const _handleSubmit = values => {
    createWallet(values.name, null, () => {
      navigation.navigate('Wallet');
    });
  };

  return (
    <Container>
      <StackHeader
        title={intl.formatMessage({defaultMessage: 'Generate Wallet'})}
        type="secondary"
      />
      <Formik
        initialValues={{}}
        validationSchema={GenerateWalletSchema}
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
            <Button
              style={styles.submitBtn}
              title={intl.formatMessage({defaultMessage: 'GENERATE'})}
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

const getGenerateWalletSchema = intl =>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GenerateWalletScreen);
