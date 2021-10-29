import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Account} from 'thenewboston';
import {StyleSheet} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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

const HandshakeVerifyScreen = ({route, wallet, navigation}) => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const styles = getStyles(insets);
  const code = route?.params?.code;
  const address = route?.params?.address;
  const redirectUrl = route?.params?.redirectUrl;
  const disabled = loading;

  const _handleConfirmPress = async () => {
    setLoading(true);
    try {
      if (!code || !wallet) {
        throw new Error('Unable to proceed');
      }

      const account = new Account(wallet.singingKey, wallet.id);
      const signature = account.createSignature(code);

      navigation.navigate('HandshakeStatus', {
        action: 'verify',
        status: 'success',
        redirectUrl:
          redirectUrl &&
          `${redirectUrl}?code=${code}&signature=${signature}&address=${wallet.id}&status=success`,
      });
    } catch (e) {
      navigation.navigate('HandshakeStatus', {
        action: 'verify',
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
        title={<FormattedMessage defaultMessage="Handshake Verify" />}
        onCancel={_handleBackPress}
      />
      <Content style={styles.content}>
        <WalletList address={address} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleTxt}>
            <FormattedMessage defaultMessage="Code" />
          </Text>
          <Text style={styles.description}>{code}</Text>
        </View>
        <Button
          style={styles.confirmBtn}
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
    titleTxt: {
      fontSize: 14,
      fontFamily: 'Roboto-Medium',
    },
    description: {
      fontSize: 12,
      fontFamily: 'Roboto-Light',
      marginTop: 10,
    },
    confirmBtn: {
      marginBottom: insets.bottom + 60,
    },
  });

const mapStateToProps = state => ({
  wallet: getSelectedWallet(state),
});

export default connect(mapStateToProps)(HandshakeVerifyScreen);
