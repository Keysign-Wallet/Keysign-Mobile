import React from 'react';
import {StyleSheet} from 'react-native';
import {FormattedMessage} from 'react-intl';

import SuccessIcon from '../../assets/icons/check-icon.svg';
import FailedIcon from '../../assets/icons/cross-icon.svg';
import {Button, Container, Text, View} from '../../common';

const SyncStatusScreen = ({route, navigation}) => {
  const status = route?.params?.status;

  const _handleGoHomePress = () => {
    navigation.navigate('Wallet');
  };

  const _handleCancelPress = () => {
    navigation.navigate('Wallet');
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
            <FormattedMessage defaultMessage="Sync Successful" />
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
            <FormattedMessage defaultMessage="Sync Failed" />
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

export default SyncStatusScreen;
