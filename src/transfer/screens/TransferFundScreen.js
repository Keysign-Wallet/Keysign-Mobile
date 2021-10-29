import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';

import {
  View,
  Text,
  Button,
  Content,
  Checkbox,
  Touchable,
  TextInput,
  Container,
  StackHeader,
} from '../../common';
import TransferFundAutoFill from '../components/TransferFundAutoFill';
import TransferFundSelectFriendModal from '../components/TransferFundSelectFriendModal';
import ScanIcon from '../../assets/icons/tab-scan-icon.svg';
import * as Colors from '../../config/colors';

import {getActiveBankConfig} from '../../banks/redux/selectors';

/* =============================================================================
<TransferFundScreen />
============================================================================= */
const TransferFundScreen = ({navigation, bankConfig}) => {
  const intl = useIntl();
  const [selectFriendModal, setSearchFriendModal] = useState(false);
  const TransferFundSchema = getTransferFundSchema(intl);

  const _toggleSearchFriendModal = () => {
    setSearchFriendModal(prevState => !prevState);
  };

  const _handleSearchFriendSubmit = setFieldValue => friend => {
    setFieldValue('address', friend?.id);
    setFieldValue('friendName', friend?.name);
    _toggleSearchFriendModal();
  };

  const _handleNavigateToScan = () => {
    navigation.navigate('TransferScan');
  };

  const _handleSubmit = values => {
    navigation.navigate('TransferDetails', {
      amount: values.amount,
      address: values.address,
      memo: values.memoChecked ? values.memo : '',
    });
  };

  const bankFee = bankConfig ? bankConfig.default_transaction_fee : 0;
  const validatorFee = bankConfig
    ? bankConfig.primary_validator.default_transaction_fee
    : 0;

  return (
    <Container>
      <StackHeader
        type="secondary"
        title={intl.formatMessage({defaultMessage: 'Transfer Fund'})}
      />
      <Formik
        initialValues={{}}
        validationSchema={TransferFundSchema}
        onSubmit={_handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          errors,
          values,
        }) => (
          <Content style={styles.content}>
            <View horizontal>
              <Touchable
                style={styles.selectFriend}
                onPress={_toggleSearchFriendModal}>
                <Text color={Colors.placeholder} fontSize={12}>
                  {values.friendName || (
                    <FormattedMessage defaultMessage="Select Friend" />
                  )}
                </Text>
              </Touchable>
              <TextInput
                value={values.address}
                errorText={errors.address}
                containerStyle={styles.accountNoInputContainer}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Account Number',
                })}
                right={
                  <Touchable style={styles.scanBtn}>
                    <ScanIcon
                      onPress={_handleNavigateToScan}
                      fill={Colors.primary}
                    />
                  </Touchable>
                }
                onBlur={handleBlur('address')}
                onChange={handleChange('address')}
              />
            </View>
            <TextInput
              value={values.amount}
              errorText={errors.amount}
              keyboardType="number-pad"
              placeholder={intl.formatMessage({defaultMessage: 'Amount'})}
              onBlur={handleBlur('amount')}
              onChange={handleChange('amount')}
            />
            <Checkbox
              label={intl.formatMessage({defaultMessage: 'Memo (optional)'})}
              style={styles.checkbox}
              checked={values.memoChecked}
              onChange={v => setFieldValue('memoChecked', v)}
            />
            {values.memoChecked ? (
              <TextInput
                value={values.memo}
                errorText={errors.memo}
                placeholder={intl.formatMessage({defaultMessage: 'Memo'})}
                onBlur={handleBlur('memo')}
                onChange={handleChange('memo')}
              />
            ) : null}
            <Text style={styles.feeTxt}>
              <FormattedMessage
                defaultMessage="Bank Fee: {amount, number}"
                values={{amount: bankFee}}
              />
            </Text>
            <Text style={styles.feeTxt}>
              <FormattedMessage
                defaultMessage="Validator Fee: {amount, number}"
                values={{amount: validatorFee}}
              />
            </Text>
            <Button
              style={styles.continueBtn}
              title={intl.formatMessage({defaultMessage: 'CONTINUE'})}
              onPress={handleSubmit}
            />
            <TransferFundAutoFill />
            <TransferFundSelectFriendModal
              visible={selectFriendModal}
              onCancel={_toggleSearchFriendModal}
              onSubmit={_handleSearchFriendSubmit(setFieldValue)}
            />
          </Content>
        )}
      </Formik>
    </Container>
  );
};

const getTransferFundSchema = intl =>
  Yup.object().shape({
    address: Yup.string().required(
      intl.formatMessage({defaultMessage: 'Must not be empty'}),
    ),
    amount: Yup.number().required(
      intl.formatMessage({defaultMessage: 'Must not be empty'}),
    ),
    memoChecked: Yup.boolean().optional(),
    memo: Yup.string().optional(),
  });

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 17,
  },
  selectFriend: {
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 17,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 15,
    backgroundColor: Colors.card,
  },
  selectInputContainer: {
    width: 115,
  },
  accountNoInputContainer: {
    flex: 1,
    marginLeft: 10,
  },
  scanBtn: {
    width: 40,
    height: 40,
    marginRight: -20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  checkbox: {
    marginTop: 30,
  },
  feeTxt: {
    fontSize: 14,
    marginTop: 20,
  },
  continueBtn: {
    marginTop: 40,
  },
});

const friendsMock = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];

const mapStateToProps = state => ({
  // friends: getFriends(state),
  friends: friendsMock,
  bankConfig: getActiveBankConfig(state),
});

/* Export
============================================================================= */
export default connect(mapStateToProps)(TransferFundScreen);
