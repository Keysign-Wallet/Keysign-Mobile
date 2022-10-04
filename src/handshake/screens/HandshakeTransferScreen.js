import React, {useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FormattedMessage, useIntl} from 'react-intl';
import {Account, AccountPaymentHandler} from 'thenewboston';

import HandshakeInfoItem from '../components/HandshakeInfoItem';
import {
  View,
  Text,
  Button,
  Content,
  Container,
  WalletList,
  StackHeader,
} from '../../common';

import * as Colors from '../../config/colors';

import {getSelectedWallet} from '../../wallet/redux/selectors';
import {getActiveBank, getActiveBankConfig} from '../../banks/redux/selectors';

const HandshakeTransferScreen = ({
  bank,
  route,
  wallet,
  bankConfig,
  navigation,
}) => {
  const intl = useIntl();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const styles = getStyles(insets);

  const address = route?.params?.address;
  const amount = +route?.params?.amount || 0;
  const memo = route?.params?.memo || undefined;
  const bankFee = bankConfig ? +bankConfig.default_transaction_fee : 0;
  const validatorFee = bankConfig
    ? +bankConfig.primary_validator.default_transaction_fee
    : 0;
  const totalFee = bankFee + validatorFee;
  const redirectUrl = route?.params?.redirectUrl;
  const disabled = loading;

  const _handleConfirmPress = async () => {
    setLoading(true);
    try {
      if (!address || !amount || !wallet) {
        throw new Error('Unable to proceed');
      }

      const paymentHandler = new AccountPaymentHandler({
        account: new Account(wallet.signingKey, wallet.id),
        bankUrl: bank,
      });
      await paymentHandler.init();
      await paymentHandler.sendCoins(address, amount, memo);

      navigation.navigate('HandshakeStatus', {
        action: 'transfer',
        status: 'success',
        redirectUrl:
          redirectUrl &&
          `${redirectUrl}?from=${wallet.id}&address=${address}&amount=${amount}&memo=${memo}&status=success`,
      });
    } catch (e) {
      navigation.navigate('HandshakeStatus', {
        action: 'transfer',
        status: 'failed',
        redirectUrl: redirectUrl && `${redirectUrl}?status=fail`,
      });
    }
    setLoading(false);
  };

  const _handleBackPress = () => {
    navigation.navigate('HomeTab', {screen: 'Home'});
  };

  return (
    <Container>
      <StackHeader
        onCancel={_handleBackPress}
        title={<FormattedMessage defaultMessage="Handshake Transfer" />}
      />
      <Content style={styles.content}>
        <WalletList />
        <View style={styles.contentContainer}>
          <HandshakeInfoItem
            title={<FormattedMessage defaultMessage="To Account Number" />}
            description={address}
          />
          <HandshakeInfoItem
            title={<FormattedMessage defaultMessage="Amount" />}
            description={`${intl.formatNumber(amount)} LEAP`}
          />
          <HandshakeInfoItem
            title={<FormattedMessage defaultMessage="Fees" />}
            description={`${intl.formatNumber(totalFee)} LEAP`}
          />
          {memo ? (
            <HandshakeInfoItem
              title={<FormattedMessage defaultMessage="Memo" />}
              description={memo}
            />
          ) : null}
          <Text fontSize={14}>
            <FormattedMessage defaultMessage="NB; This cannot be undone." />
          </Text>
        </View>
        <Button
          style={styles.btn}
          title={<FormattedMessage defaultMessage="CONFIRM" />}
          loading={loading}
          disabled={disabled}
          onPress={_handleConfirmPress}
        />
      </Content>
    </Container>
  );
};

const getStyles = insets =>
  StyleSheet.create({
    content: {
      paddingHorizontal: 17,
    },
    contentContainer: {
      flex: 1,
      paddingTop: 16,
      marginVertical: 16,
      borderTopWidth: 1,
      borderTopColor: Colors.border,
    },
    btn: {
      marginBottom: insets.bottom + 60,
    },
  });

const mapStateToProps = state => ({
  bank: getActiveBank(state),
  wallet: getSelectedWallet(state),
  bankConfig: getActiveBankConfig(state),
});

export default connect(mapStateToProps)(HandshakeTransferScreen);
