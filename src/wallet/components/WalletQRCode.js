import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {View} from '../../common';

import {getSelectedWallet} from '../redux/selectors';

const WalletQRCode = ({wallet}) => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);

  if (wallet) {
    const qrCode = JSON.stringify({
      address: wallet.id,
    });

    return (
      <View style={styles.qrcodeContainer}>
        <View style={styles.qrcodeBackground}>
          <QRCode size={150} value={qrCode} backgroundColor="#e8f0fb" />
        </View>
      </View>
    );
  }

  return null;
};
const getStyles = insets =>
  StyleSheet.create({
    qrcodeContainer: {
      marginTop: 60,
      alignItems: 'center',
      marginBottom: insets.bottom + 60,
    },
    qrcodeBackground: {
      flex: 1,
      width: 200,
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#e8f0fb',
      borderRadius: 15,
    },
  });

const mapStateToProp = state => ({
  wallet: getSelectedWallet(state),
});

export default connect(mapStateToProp)(WalletQRCode);
