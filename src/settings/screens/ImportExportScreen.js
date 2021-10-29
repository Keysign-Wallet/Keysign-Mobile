import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Alert, StyleSheet} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';

import {Button, Container, Content, StackHeader, Text} from '../../common';
import SyncWalletModal from '../../wallet/components/SyncWalletModal';
import {exportWallets} from '../../config/walletStorage';

import {getPassword} from '../../auth/redux/selectors';

/* =============================================================================
<ImportExportScreen />
============================================================================= */
const ImportExportScreen = ({password, navigation}) => {
  const intl = useIntl();
  const [syncModal, setSyncModal] = useState(false);
  const [exporting, setExporting] = useState(false);

  const _handleModalVisible = () => {
    setSyncModal(true);
  };

  const _handleCancelPress = () => {
    setSyncModal(false);
  };

  const _handleModalScanPress = () => {
    navigation.navigate('WalletStack', {screen: 'SyncScan'});
    setSyncModal(false);
  };

  const _handleImportPress = () => {
    navigation.navigate('WalletStack', {screen: 'ImportKeys'});
  };

  const _handleExportPress = async () => {
    setExporting(true);
    try {
      const file = await exportWallets(password);

      if (file) {
        Alert.alert(
          intl.formatMessage({defaultMessage: 'Success'}),
          intl.formatMessage({
            defaultMessage: 'Wallets has been exported successfully',
          }),
        );
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
    setExporting(false);
  };

  return (
    <Container>
      <StackHeader
        type="primary"
        title={<FormattedMessage defaultMessage="Sync/Import/Export" />}
      />
      <Content style={styles.contentContainer}>
        <SyncWalletModal
          onScan={_handleModalScanPress}
          onCancel={_handleCancelPress}
          visible={syncModal}
        />
        <Button
          block
          height={55}
          onPress={_handleModalVisible}
          title={<FormattedMessage defaultMessage="SYNC WALLET" />}
        />
        <Button
          block
          height={55}
          title={<FormattedMessage defaultMessage="IMPORT" />}
          onPress={_handleImportPress}
        />
        <Button
          block
          height={55}
          title={<FormattedMessage defaultMessage="EXPORT" />}
          loading={exporting}
          disabled={exporting}
          onPress={_handleExportPress}
        />
        <Text fontSize={12} lineHeight={14} marginVertical={20}>
          <FormattedMessage
            defaultMessage="You can export all your keys encrypted in a file.
           This will allow you to import them to keysign on another device or
            simply safeguard them."
          />
        </Text>
        <Text fontSize={12} lineHeight={14}>
          <FormattedMessage
            defaultMessage="When importing, only accounts that are not
          already present on the instance will be added."
          />
        </Text>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 50,
    paddingHorizontal: 17,
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  password: getPassword(state),
});

/* Export
============================================================================= */
export default connect(mapStateToProps)(ImportExportScreen);
