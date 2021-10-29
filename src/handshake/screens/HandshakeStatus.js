import React, {useEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import {InteractionManager, Linking, StyleSheet} from 'react-native';

import SuccessIcon from '../../assets/icons/check-icon.svg';
import FailedIcon from '../../assets/icons/cross-icon.svg';
import {Button, Container, Text, View} from '../../common';

const HandshakeStatus = ({route, navigation}) => {
  const action = route?.params?.action;
  const status = route?.params?.status;
  const redirectUrl = route?.params?.redirectUrl;

  // Call the redirect URL
  useEffect(() => {
    if (redirectUrl) {
      InteractionManager.runAfterInteractions(() => {
        Linking.openURL(redirectUrl).catch(() => {});
      });
    }
  }, [redirectUrl]);

  const _handleGoHomePress = () => {
    navigation.navigate('Home');
  };

  const _handleCancelPress = () => {
    navigation.navigate('Home');
  };

  const _handleTryAgainPress = () => {
    navigation.goBack();
  };

  return (
    <Container style={styles.container} alignItems="center">
      {status === 'success' ? (
        <>
          <SuccessIcon />
          <Text style={styles.titleTxt}>
            {action === 'transfer' && (
              <FormattedMessage defaultMessage="Transfer Successful" />
            )}
            {action === 'verify' && (
              <FormattedMessage defaultMessage="Verify Successful" />
            )}
          </Text>
          <Button
            type="light"
            style={styles.btn}
            title={<FormattedMessage defaultMessage="Go Home" />}
            onPress={_handleGoHomePress}
          />
        </>
      ) : (
        <>
          <FailedIcon />
          <Text style={styles.titleTxt}>
            {action === 'transfer' && (
              <FormattedMessage defaultMessage="Transfer Failed" />
            )}
            {action === 'verify' && (
              <FormattedMessage defaultMessage="Verify Failed" />
            )}
          </Text>
          <View horizontal style={styles.btnContainer}>
            <Button
              type="light"
              style={styles.btn}
              title={<FormattedMessage defaultMessage="Cancel" />}
              onPress={_handleCancelPress}
            />
            <Button
              type="primary"
              style={styles.btn}
              title={<FormattedMessage defaultMessage="Try Again" />}
              onPress={_handleTryAgainPress}
            />
          </View>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 24,
    fontFamily: 'Roboto-Medium',
    marginTop: 60,
  },
  btn: {
    marginTop: 160,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
});

export default HandshakeStatus;
