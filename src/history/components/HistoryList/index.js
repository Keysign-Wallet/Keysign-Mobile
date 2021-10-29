import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {SectionList, StyleSheet} from 'react-native';

import HistoryListItem from './HistoryListItem';
import HistoryListEmpty from './HistoryListEmpty';
import HistoryListHeader from './HistoryListHeader';
import HistoryListSectionHeader from './HistoryListSectionHeader';
import HistoryListItemSeparator from './HistoryListItemSeparator';

import {getActiveBank} from '../../../banks/redux/selectors';
import {getSelectedWallet} from '../../../wallet/redux/selectors';
import {getWalletTransactionIdsByDate} from '../../redux/selectors';
import {getTransactions as getTransactionsAction} from '../../redux/actions';

const HistoryList = ({walletId, activeBank, transactions, getTransactions}) => {
  useEffect(() => {
    if (walletId && activeBank) {
      getTransactions(activeBank, walletId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletId, activeBank]);

  return (
    <SectionList
      sections={transactions}
      contentContainerStyle={styles.contentContainer}
      renderItem={renderItem}
      keyExtractor={renderKeyExtractor}
      ListEmptyComponent={HistoryListEmpty}
      ListHeaderComponent={HistoryListHeader}
      renderSectionHeader={renderSectionHeader}
      ItemSeparatorComponent={HistoryListItemSeparator}
    />
  );
};
const renderItem = ({item}) => <HistoryListItem id={item} />;
const renderKeyExtractor = item => `${item}`;
const renderSectionHeader = ({section: {title}}) => (
  <HistoryListSectionHeader title={title} />
);

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
});

const mapStateToProps = state => {
  const walletId = getSelectedWallet(state)?.id;
  return {
    walletId,
    activeBank: getActiveBank(state),
    transactions: getWalletTransactionIdsByDate(state, {walletId}),
  };
};

const mapDispatchToProps = {
  getTransactions: getTransactionsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList);
