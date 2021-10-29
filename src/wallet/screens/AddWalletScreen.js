import React, {useState} from 'react';
import {InteractionManager, StyleSheet} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useNavigation} from '@react-navigation/native';

import {Button, Container, StackHeader, View} from '../../common';
import SyncWalletModal from '../components/SyncWalletModal';

/* =============================================================================
<AddWalletScreen />
============================================================================= */
const AddWalletScreen = () => {
  const navigation = useNavigation();
  const [syncModal, setSyncModal] = useState(false);

  const _toggleSyncModal = () => {
    setSyncModal(prevState => !prevState);
  };

  const _handleLinkPress = to => {
    navigation.navigate(to);
  };

  const _handleModalScanPress = () => {
    _toggleSyncModal();
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('WalletStack', {screen: 'SyncScan'});
    });
  };

  return (
    <Container>
      <StackHeader
        type="primary"
        title={<FormattedMessage defaultMessage="Add Wallet" />}
      />
      <View style={styles.contentContainer}>
        <Button
          block
          title={<FormattedMessage defaultMessage="USE ACCN/SIGNIN" />}
          onPress={() => _handleLinkPress('AccnSignKey')}
        />
        <Button
          block
          title={<FormattedMessage defaultMessage="GENERATE WALLET" />}
          onPress={() => _handleLinkPress('GenerateWallet')}
        />
        <Button
          block
          title={<FormattedMessage defaultMessage="SYNC WALLET" />}
          onPress={_toggleSyncModal}
        />
        <Button
          block
          title={<FormattedMessage defaultMessage="IMPORT KEYS" />}
          onPress={() => _handleLinkPress('ImportKeys')}
        />
        <Button
          block
          title={<FormattedMessage defaultMessage="ADD FRIEND" />}
          onPress={() => _handleLinkPress('FriendsStack')}
        />
      </View>
      <SyncWalletModal
        visible={syncModal}
        onScan={_handleModalScanPress}
        onCancel={_toggleSyncModal}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 17,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

/* Export
============================================================================= */
export default AddWalletScreen;
