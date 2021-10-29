import React from 'react';
import {connect} from 'react-redux';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'react-intl';
import {StyleSheet, View} from 'react-native';

import {Text, Touchable} from '../../../common';
import DepositIcon from '../../../assets/icons/deposite-icon.svg';
import TransferIcon from '../../../assets/icons/transfer-icon.svg';
import * as Colors from '../../../config/colors';

import {getSelectedWallet} from '../../../wallet/redux/selectors';
import {makeGetTransactionById} from '../../redux/selectors';

const HistoryListItem = ({transaction, walletId}) => {
  const date = transaction
    ? new Date(transaction.block.created_date)
    : new Date();
  const amount = transaction ? transaction.amount : 0;
  const sender = transaction && transaction.block.sender;
  const recipient = transaction && transaction.recipient;
  const transactionType = recipient === walletId ? 'deposit' : 'transfer';

  return (
    <Touchable style={styles.container}>
      <View style={styles.iconContainer}>
        {transactionType === 'deposit' ? <DepositIcon /> : <TransferIcon />}
      </View>
      <View flex={1}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountTxt}>
            TNBC {transactionType === 'deposit' ? '+' : '-'}
            <FormattedNumber value={amount} />
          </Text>
          <Text style={styles.commonTxt}>
            <FormattedDate value={date} day="2-digit" month="short" />
          </Text>
        </View>
        <Text style={styles.commonTxt}>
          {transactionType === 'deposit' ? (
            <FormattedMessage defaultMessage="Received from:" />
          ) : (
            <FormattedMessage defaultMessage="Send to:" />
          )}
        </Text>
        <Text style={styles.commonTxt}>
          {transactionType === 'deposit' ? sender : recipient}
        </Text>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 14,
    paddingHorizontal: 17,
    backgroundColor: Colors.card,
  },
  iconContainer: {
    width: 36,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountTxt: {
    fontSize: 14,
  },
  commonTxt: {
    fontSize: 12,
    color: Colors.placeholder,
  },
});

const mapStateToProps = () => {
  const getTransactionById = makeGetTransactionById();
  return (state, {id}) => ({
    walletId: getSelectedWallet(state)?.id,
    transaction: getTransactionById(state, {id}),
  });
};

export default connect(mapStateToProps)(HistoryListItem);
