import React, {useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {Alert, StyleSheet} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';

import {View, Text, TabHeader, Container} from '../../common';
import ScanIcon from '../../assets/icons/scan-icon.svg';

/* =============================================================================
<ScanScreen />
============================================================================= */
const ScanScreen = ({navigation}) => {
  const intl = useIntl();
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

        navigation.navigate('TransferStack', {
          screen: 'TransferFund',
          params: {
            address,
            amount,
            memo,
          },
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

  return (
    <Container>
      <TabHeader
        type="secondary"
        title={<FormattedMessage defaultMessage="Scan" />}
      />
      <RNCamera
        type={RNCamera.Constants.Type.back}
        style={styles.camera}
        captureAudio={false}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={_handleBarCodeRead}>
        <View style={styles.content}>
          <ScanIcon />
          <Text style={styles.cameraTxt}>
            <FormattedMessage defaultMessage="Scan the QR code" />
          </Text>
        </View>
      </RNCamera>
    </Container>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
    marginTop: -15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
  },
  content: {
    alignItems: 'center',
    marginBottom: 90,
  },
  cameraTxt: {
    marginTop: 40,
  },
});

/* Export
============================================================================= */
export default ScanScreen;
