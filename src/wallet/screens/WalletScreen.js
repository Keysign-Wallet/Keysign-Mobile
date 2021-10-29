import React from 'react';
import {StyleSheet} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {Content, Container, TabHeader, WalletList} from '../../common';
import WalletDetails from '../components/WalletDetails';
import WalletQRCode from '../components/WalletQRCode';

/* =============================================================================
<WalletScreen />
============================================================================= */
const WalletScreen = () => {
  return (
    <Container>
      <TabHeader
        type="secondary"
        title={<FormattedMessage defaultMessage="My Wallet" />}
      />
      <Content style={styles.content}>
        <WalletList />
        <WalletDetails />
        <WalletQRCode />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 17,
  },
});

/* Export
============================================================================= */
export default WalletScreen;
