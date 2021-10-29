import React, {useState} from 'react';
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import {StyleSheet} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {FormattedMessage, useIntl} from 'react-intl';

import {View, Text, TextInput, Touchable} from '../../common';
import ClipBoardIcon from '../../assets/icons/clipboard-icon.svg';
import * as Colors from '../../config/colors';

import {getSelectedWallet} from '../redux/selectors';

/* =============================================================================
<WalletDetails />
============================================================================= */
const WalletDetails = ({wallet}) => {
  const intl = useIntl();
  const [eyeToggle, setEyeToggle] = useState(true);

  if (wallet) {
    const userName = wallet.name;
    const balance = wallet.balance || 0;
    const accountNumber = wallet.id;
    const signingKey = wallet.signingKey;

    const _handleEyePress = () => {
      setEyeToggle(prevState => !prevState);
    };

    const _handleCopyToClipBoardPress = value => () => {
      Clipboard.setString(value);
      Toast.show(
        intl.formatMessage(
          {defaultMessage: 'Copied'},
          {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          },
        ),
      );
    };

    return (
      <>
        <Text style={styles.userNameTxt}>{userName}</Text>
        <Text style={styles.balance}>{intl.formatNumber(balance)} TNBC</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label={<FormattedMessage defaultMessage="Account Number" />}
            value={accountNumber}
            editable={false}
            inputStyle={styles.input}
          />
          <Touchable
            style={styles.copyBtn}
            onPress={_handleCopyToClipBoardPress(accountNumber)}>
            <ClipBoardIcon />
          </Touchable>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label={<FormattedMessage defaultMessage="Signing Key" />}
            value={signingKey}
            editable={false}
            inputStyle={styles.input}
            secureTextEntry={eyeToggle}
          />
          <Touchable style={styles.eyeBtn} onPress={_handleEyePress}>
            <FontAwesome5Icon
              name="eye"
              style={styles.inputLabelIcon}
              color={eyeToggle ? Colors.primary : Colors.placeholder}
            />
          </Touchable>
          <Touchable
            style={styles.copyBtn}
            onPress={_handleCopyToClipBoardPress(signingKey)}>
            <ClipBoardIcon />
          </Touchable>
        </View>
      </>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  userNameTxt: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
  },
  balance: {
    marginBottom: 13,
    color: Colors.primary,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  input: {
    textAlign: 'left',
  },
  inputContainer: {
    position: 'relative',
  },
  copyBtn: {
    position: 'absolute',
    top: 16,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  eyeBtn: {
    position: 'absolute',
    top: 16,
    right: 31,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
});

const mapStateToProp = state => ({
  wallet: getSelectedWallet(state),
});

/* Export
============================================================================= */
export default connect(mapStateToProp, null)(WalletDetails);
