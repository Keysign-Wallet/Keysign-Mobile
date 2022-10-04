import React, {useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';
import {Account, AccountPaymentHandler} from 'thenewboston';

import {Button, Container, Content, StackHeader, Text} from '../../common';
import TransferDetailsItem from '../components/TransferDetailsItem';

import {getSelectedWallet} from '../../wallet/redux/selectors';
import {getActiveBank, getActiveBankConfig} from '../../banks/redux/selectors';

/* =============================================================================
<TransferScreen />
============================================================================= */
const TransferDetailsScreen = ({
  bank,
  route,
  wallet,
  navigation,
  bankConfig,
}) => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);

  const address = route.params?.address;
  const amount = +route.params?.amount || 0;
  const memo = route.params?.memo || undefined;

  const walletName = wallet?.name;
  const bankFee = bankConfig ? +bankConfig.default_transaction_fee : 0;
  const validatorFee = bankConfig
    ? +bankConfig.primary_validator.default_transaction_fee
    : 0;
  const totalFee = bankFee + validatorFee;
  const disabled = !wallet || !bank || loading;

  const _handleConfirmPress = async () => {
    if (!disabled) {
      setLoading(true);
      try {
        const paymentHandler = new AccountPaymentHandler({
          account: new Account(wallet.signingKey, wallet.id),
          bankUrl: bank,
        });
        await paymentHandler.init();
        await paymentHandler.sendCoins(address, amount, memo);
        navigation.navigate('TransferStatus', {status: 'success'});
      } catch (e) {
        navigation.navigate('TransferStatus', {status: 'failed'});
      }
      setLoading(false);
    }
  };

  return (
    <Container>
      <StackHeader title={<FormattedMessage defaultMessage="Transfer" />} />
      <Content style={styles.content}>
        <TransferDetailsItem
          title={
            <FormattedMessage
              defaultMessage="From {name}"
              values={{name: walletName}}
            />
          }
        />
        <TransferDetailsItem
          title={<FormattedMessage defaultMessage="To Account Number" />}
          description={address}
        />
        <TransferDetailsItem
          title={<FormattedMessage defaultMessage="Amount" />}
          description={`${intl.formatNumber(amount)} LEAP`}
        />
        <TransferDetailsItem
          title={<FormattedMessage defaultMessage="Fees" />}
          description={`${intl.formatNumber(totalFee)} LEAP`}
        />
        {memo ? (
          <TransferDetailsItem
            title={<FormattedMessage defaultMessage="Memo" />}
            description={memo}
          />
        ) : null}
        <Text style={styles.warningTxt}>
          <FormattedMessage defaultMessage="NB; This cannot be undone." />
        </Text>
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

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 17,
  },
  warningTxt: {
    fontSize: 14,
  },
  btn: {
    marginTop: 60,
  },
});

const mapStateToProps = state => ({
  bank: getActiveBank(state),
  wallet: getSelectedWallet(state),
  bankConfig: getActiveBankConfig(state),
});

/* Export
============================================================================= */
export default connect(mapStateToProps)(TransferDetailsScreen);
