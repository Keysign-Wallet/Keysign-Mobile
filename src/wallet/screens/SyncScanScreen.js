import React from 'react';
import {connect} from 'react-redux';
import {RNCamera} from 'react-native-camera';
import {StyleSheet} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {Button, Container, View} from '../../common';
import ScanHeader from '../../common/ScanHeader';
import ScanIcon from '../../assets/icons/scan-icon.svg';

import {getLoading} from '../../auth/redux/selectors';
import {syncWallets as syncWalletsAction} from '../redux/actions';

const SyncScanScreen = ({loading, navigation, syncWallets}) => {
  const disabled = loading;

  const _handleBarCodeRead = ({data}) => {
    if (!disabled) {
      syncWallets(data, error => {
        navigation.navigate('SyncStatus', {
          status: error ? 'failed' : 'success',
        });
      });
    }
  };

  const _handleCancelPress = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <ScanHeader title={<FormattedMessage defaultMessage="Sync Scan" />} />
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
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
          <Button
            type="light"
            style={styles.cancelBtn}
            title={<FormattedMessage defaultMessage="Cancel" />}
            loading={loading}
            disabled={disabled}
            onPress={_handleCancelPress}
          />
        </View>
      </RNCamera>
    </Container>
  );
};
const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: 90,
  },
  cancelBtn: {
    marginTop: 40,
  },
});

const mapStateToProps = state => ({
  loading: getLoading(state),
});

const mapDispatchToProps = {
  syncWallets: syncWalletsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncScanScreen);
