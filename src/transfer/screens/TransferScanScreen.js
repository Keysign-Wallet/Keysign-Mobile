import React, {useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import {Alert, StyleSheet} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';

import {Button, Container} from '../../common';
import ScanHeader from '../../common/ScanHeader';
import ScanIcon from '../../assets/icons/scan-icon.svg';

const TransferScanScreen = () => {
  const intl = useIntl();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const _handleBarCodeRead = ({data}) => {
    if (!loading) {
      try {
        setLoading(true);
        const json = JSON.parse(data);
        // Safety check for double parsing
        const {address, amount, memo} =
          typeof json === 'string' ? JSON.parse(json) : json;

        if (!address) {
          throw new Error('Invalid qr code');
        }

        navigation.navigate('TransferFund', {
          address,
          amount,
          memo,
        });
        setLoading(false);
      } catch (e) {
        Alert.alert(
          intl.formatMessage({defaultMessage: 'Scan Error'}),
          intl.formatMessage({defaultMessage: 'Device failed to scan'}),
          [
            {
              text: intl.formatMessage({defaultMessage: 'Cancel'}),
              onPress: () => {
                navigation.goBack();
                setLoading(false);
              },
            },
            {
              text: intl.formatMessage({defaultMessage: 'Retry'}),
              onPress: () => {
                setLoading(false);
              },
            },
          ],
        );
      }
    }
  };

  const _handleCancelPress = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <ScanHeader title={<FormattedMessage defaultMessage="Send Scan" />} />
      <RNCamera
        type={RNCamera.Constants.Type.back}
        style={styles.preview}
        captureAudio={false}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={_handleBarCodeRead}>
        <ScanIcon />
        <Button
          type="light"
          onPress={_handleCancelPress}
          style={styles.cancelBtn}
          title={<FormattedMessage defaultMessage="Cancel" />}
        />
      </RNCamera>
    </Container>
  );
};
const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    marginTop: 40,
    marginBottom: 60,
  },
});

export default TransferScanScreen;
