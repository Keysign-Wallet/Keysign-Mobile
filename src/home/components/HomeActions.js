import React from 'react';
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FormattedMessage, useIntl} from 'react-intl';

import {Text, Touchable, View} from '../../common';

import * as Colors from '../../config/colors';

import {getSelectedWallet} from '../../wallet/redux/selectors';

/* =============================================================================
<HomeActions />
============================================================================= */
const HomeActions = ({wallet}) => {
  const intl = useIntl();
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      <Touchable
        onPress={_handleSendPress}
        style={[styles.btn, styles.whiteBtn]}>
        <Text color={Colors.primary}>
          <FormattedMessage defaultMessage="SEND" />
        </Text>
      </Touchable>
      <Touchable
        onPress={_handleHistoryPress}
        style={[styles.btn, styles.blueBtn]}>
        <Text color={Colors.card}>
          <FormattedMessage defaultMessage="HISTORY" />
        </Text>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginHorizontal: 35,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    flex: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  whiteBtn: {
    backgroundColor: Colors.card,
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
  },
  blueBtn: {
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
    backgroundColor: Colors.primary,
  },
});

const mapStateToProps = state => ({
  wallet: getSelectedWallet(state),
});

/* Export
============================================================================= */
export default connect(mapStateToProps)(HomeActions);
