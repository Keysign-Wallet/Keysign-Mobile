import React, {useEffect, useState} from 'react';
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import {useIntl} from 'react-intl';
import {useFocusEffect} from '@react-navigation/native';

import {Content, View} from '../../common';
import HomeHeader from '../components/HomeHeader';
import HomeAction from '../components/HomeAction';

import SendIcon from '../../assets/icons/nav-send.svg';
import HistoryIcon from '../../assets/icons/app-history.svg';
import TradeIcon from '../../assets/icons/app-trade.svg';

import {getAllIds, getSelectedWallet} from '../../wallet/redux/selectors';
import {getActiveBankConfig} from '../../banks/redux/selectors';
import {
  selectWallet as selectWalletAction,
  getWalletBalance as getWalletBalanceAction,
} from '../../wallet/redux/actions';
import HomeTradeModal from '../components/HomeTradeModal';

/* =============================================================================
<HomeScreen />
============================================================================= */
const HomeScreen = ({
  wallet,
  wallets,
  bankConfig,
  navigation,
  selectWallet,
  getWalletBalance,
}) => {
  const intl = useIntl();
  const [tradeModal, setTradeModal] = useState(false);

  // Move to Add Wallet when there is no wallet.
  useEffect(() => {
    if (!wallets.length) {
      navigation.navigate('WalletStack', {
        screen: 'AddWallet',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Select wallet
  useEffect(() => {
    if (wallets.length && !wallet) {
      selectWallet(wallets[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets, wallet]);

  // Get wallet balance
  useEffect(() => {
    if (wallet && bankConfig) {
      getWalletBalance(wallet, bankConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, bankConfig]);

  // Get wallet balance on focus
  useFocusEffect(() => {
    if (wallet && bankConfig) {
      getWalletBalance(wallet, bankConfig);
    }
  });

  const _toggleTradeModal = () => {
    setTradeModal(prevState => !prevState);
  };

  const _handleSendPress = () => {
    if (wallet) {
      navigation.navigate('TransferStack', {screen: 'TransferFund'});
    } else {
      Toast.show(intl.formatMessage({defaultMessage: 'No Wallet'}));
    }
  };

  const _handleHistoryPress = () => {
    if (wallet) {
      navigation.navigate('History');
    } else {
      Toast.show(intl.formatMessage({defaultMessage: 'No Wallet'}));
    }
  };

  const _handleTradePress = () => {
    _toggleTradeModal();
  };

  return (
    <Content>
      <HomeHeader />
      <View horizontal paddingHorizontal={12}>
        <HomeAction
          title={intl.formatMessage({defaultMessage: 'Send'})}
          icon={<SendIcon />}
          onPress={_handleSendPress}
        />
        <HomeAction
          title={intl.formatMessage({defaultMessage: 'History'})}
          icon={<HistoryIcon />}
          onPress={_handleHistoryPress}
        />
        <HomeAction
          title={intl.formatMessage({defaultMessage: 'Trade'})}
          icon={<TradeIcon />}
          onPress={_handleTradePress}
        />
      </View>
      <HomeTradeModal visible={tradeModal} onCancel={_toggleTradeModal} on />
    </Content>
  );
};

const mapStateToProps = state => ({
  wallet: getSelectedWallet(state)?.id,
  wallets: getAllIds(state),
  bankConfig: getActiveBankConfig(state),
});

const mapDispatchToProps = {
  selectWallet: selectWalletAction,
  getWalletBalance: getWalletBalanceAction,
};

const propsAreEqual = (prevProps, nextProps) =>
  prevProps.wallet === nextProps.wallet &&
  prevProps.wallets.length === nextProps.wallets.length &&
  JSON.stringify(prevProps.bankConfig) === JSON.stringify(nextProps.bankConfig);

/* Export
============================================================================= */
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(HomeScreen, propsAreEqual));
