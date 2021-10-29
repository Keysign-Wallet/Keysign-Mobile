import React from 'react';
import {connect} from 'react-redux';
import {Alert, StyleSheet} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';

import {
  Button,
  Content,
  Container,
  WalletList,
  StackHeader,
  FocusAwareStatusBar,
} from '../../common';
import WalletDetails from '../components/WalletDetails';

import {getLoading, getSelectedWallet} from '../redux/selectors';
import {deleteWallet as deleteWalletAction} from '../redux/actions';

/* =============================================================================
<ManageWalletScreen />
============================================================================= */
const ManageWalletScreen = ({wallet, loading, deleteWallet}) => {
  const intl = useIntl();
  const disabled = !wallet || loading;

  const _handleDeletePress = () => {
    if (!disabled) {
      Alert.alert(
        intl.formatMessage({defaultMessage: 'Confirmation'}),
        intl.formatMessage({
          defaultMessage: 'Are you sure you want to delete this wallet?',
        }),
        [
          {
            text: intl.formatMessage({defaultMessage: 'No'}),
            style: 'cancel',
          },
          {
            text: intl.formatMessage({defaultMessage: 'Yes'}),
            onPress: () => {
              deleteWallet(wallet);
            },
          },
        ],
        {cancelable: true},
      );
    }
  };

  return (
    <Container>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <StackHeader
        title={<FormattedMessage defaultMessage="Manage Wallet" />}
      />
      <Content style={styles.content}>
        <WalletList />
        <WalletDetails />
        {!!wallet && (
          <Button
            style={styles.btn}
            title={<FormattedMessage defaultMessage="DELETE WALLET" />}
            loading={loading}
            disabled={disabled}
            onPress={_handleDeletePress}
          />
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 17,
  },
  btn: {
    marginTop: 60,
  },
});

const mapStateToProps = state => ({
  wallet: getSelectedWallet(state)?.id,
  loading: getLoading(state),
});

const mapDispatchToProps = {
  deleteWallet: deleteWalletAction,
};

/* Export
============================================================================= */
export default connect(mapStateToProps, mapDispatchToProps)(ManageWalletScreen);
