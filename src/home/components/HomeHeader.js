import React from 'react';
import {useIntl} from 'react-intl';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {FormattedMessage, FormattedNumber} from 'react-intl';

import {TabHeader, Text, Touchable, View} from '../../common';
import MenuIcon from '../../assets/icons/3-doted-icon.svg';
import WavesIcon from '../../assets/icons/waves-icon.svg';
import LockIcon from '../../assets/icons/lock-icon.svg';
import * as Colors from '../../config/colors';

import {getSelectedWallet} from '../../wallet/redux/selectors';

const HomeHeader = ({wallet}) => {
  const intl = useIntl();
  const navigation = useNavigation();

  const name = wallet
    ? wallet.name
    : intl.formatMessage({defaultMessage: 'No Wallet'});
  const balance = wallet && wallet.balance ? wallet.balance : 0;
  const balanceInUSD = wallet && wallet.balanceInUSD ? wallet.balanceInUSD : 0;
  const lockedAmount = wallet && wallet.lockedAmount ? wallet.lockedAmount : 0;

  const _handleMenuPress = () => {
    navigation.navigate('WalletStack', {
      screen: 'ManageWallet',
    });
  };

  return (
    <TabHeader style={styles.container} primary>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <Touchable style={styles.menuBtn} onPress={_handleMenuPress}>
          <MenuIcon />
        </Touchable>
      </View>
      <Text style={[styles.white, styles.label]}>
        <FormattedMessage defaultMessage="Total coins" />
      </Text>
      <Text style={[styles.white, styles.totalCoins]}>
        <FormattedNumber value={balance} maximumFractionDigits={2} />{' '}
        {KEYSIGN_CURRENCY}
      </Text>
      <Text style={[styles.white, styles.balance]}>
        <WavesIcon />{' '}
        <FormattedNumber style="currency" value={balanceInUSD} currency="usd" />
      </Text>
      <Text style={[styles.white, styles.label]}>
        <FormattedMessage defaultMessage="Locked coins" />
      </Text>
      <Text style={[styles.white, styles.balance]}>
        {lockedAmount} {KEYSIGN_CURRENCY}
        <View paddingHorizontal={10}>
          <LockIcon />
        </View>
      </Text>
    </TabHeader>
  );
};

const KEYSIGN_CURRENCY = 'LEAP';

const styles = StyleSheet.create({
  container: {
    height: null,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 52,
    paddingBottom: 32,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginBottom: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.card,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
  },
  menuBtn: {
    paddingTop: 10,
    paddingBottom: 23,
    paddingHorizontal: 20,
  },
  white: {
    color: Colors.card,
  },
  label: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 12,
  },
  totalCoins: {
    marginHorizontal: 20,
    fontSize: 32,
    fontFamily: 'Roboto-Bold',
  },
  balance: {
    marginHorizontal: 20,
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
  },
});

const mapStateToProps = state => ({
  wallet: getSelectedWallet(state),
});

export default connect(mapStateToProps)(HomeHeader);
