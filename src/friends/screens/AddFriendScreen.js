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

import {getAllIds, getLoading} from '../redux/selectors';
import {createFriend as createFriendAction} from '../redux/actions';

/* =============================================================================
<AddFriendScreen />
============================================================================= */
const AddFriendScreen = ({friends, loading, createFriend}) => {
  const intl = useIntl();
  const navigation = useNavigation();
  const AddFriendSchema = getAddFriendSchema(intl, {friends});

  const _handleSubmit = values => {
    createFriend(values.name, values.accountNo, () => {
      navigation.navigate('Home');
    });
  };

  return (
    <Container>
      <StackHeader
        type="secondary"
        title={intl.formatMessage({defaultMessage: 'Add Friend'})}
      />
      <Formik
        initialValues={{}}
        validationSchema={AddFriendSchema}
        onSubmit={_handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, errors, values}) => (
          <View style={styles.contentContainer}>
            <TextInput
              left={<WalletRound />}
              value={values.name}
              errorText={errors.name}
              placeholder={intl.formatMessage({defaultMessage: 'Friend Name'})}
              onBlur={handleBlur('name')}
              onChange={handleChange('name')}
            />
            <TextInput
              left={<KeyRound />}
              value={values.accountNo}
              errorText={errors.accountNo}
              placeholder={intl.formatMessage({
                defaultMessage: 'Account Number',
              })}
              onBlur={handleBlur('accountNo')}
              onChange={handleChange('accountNo')}
            />
            <Button
              style={styles.submitBtn}
              title={intl.formatMessage({defaultMessage: 'ADD FRIEND'})}
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

const getAddFriendSchema = (intl, {friends}) =>
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
    accountNo: Yup.string()
      .min(
        64,
        intl.formatMessage({defaultMessage: 'Must be at least 64 characters!'}),
      )
      .max(
        64,
        intl.formatMessage({defaultMessage: 'Must not exceed 64 characters!'}),
      )
      .notOneOf(
        friends,
        intl.formatMessage({
          defaultMessage: 'Friend with this account number already exists!',
        }),
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
  friends: getAllIds(state),
  loading: getLoading(state),
});

const mapDispatchToProps = {
  createFriend: createFriendAction,
};

/* Export
============================================================================= */
export default connect(mapStateToProps, mapDispatchToProps)(AddFriendScreen);
