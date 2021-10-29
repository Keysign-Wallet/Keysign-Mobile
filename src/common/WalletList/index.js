import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet} from 'react-native';

import WalletListItem from './WalletListItem';
import WalletListAddButton from './WalletListAddButton';

import {
  getAllIds,
  getWalletById,
  getSelectedWallet,
} from '../../wallet/redux/selectors';
import {selectWallet as selectWalletAction} from '../../wallet/redux/actions';

const WalletList = ({
  wallets,
  walletByAddress,
  selectedWallet,
  selectWallet,
}) => {
  //
  // Set first wallet as selected
  useEffect(() => {
    if (wallets.length && !selectedWallet) {
      selectWallet(walletByAddress ? walletByAddress.id : wallets[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets.length, walletByAddress]);

  const _handleSelectWallet = id => {
    selectWallet(id);
  };

  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}>
      {wallets.map(wallet => (
        <WalletListItem
          id={wallet}
          key={wallet}
          selected={selectedWallet === wallet}
          onPress={_handleSelectWallet}
        />
      ))}
      <WalletListAddButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 40,
    marginHorizontal: -17,
  },
  content: {
    paddingRight: 17,
    alignItems: 'flex-start',
  },
});

const mapStateToProps = (state, {address}) => ({
  wallets: getAllIds(state),
  selectedWallet: getSelectedWallet(state)?.id,
  walletByAddress: getWalletById(state, {id: address}),
});

const mapDispatchToProps = {
  selectWallet: selectWalletAction,
};

const propsAreEqual = (prevProps, nextProps) =>
  prevProps.wallets.toString() === nextProps.wallets.toString() &&
  prevProps.selectedWallet === nextProps.selectedWallet &&
  prevProps.walletByAddress?.id === nextProps.walletByAddress?.id;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(WalletList, propsAreEqual));
