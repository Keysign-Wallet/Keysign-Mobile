import React from 'react';
import {FormattedMessage} from 'react-intl';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

import {Container, Content, TabHeader} from '../../common';
import AddWalletIcon from '../../assets/icons/setting-addwallet-icon.svg';
import WalletIcon from '../../assets/icons/tab-wallet-icon.svg';
import FriendsIcon from '../../assets/icons/setting-friends.svg';
import PreferencesIcon from '../../assets/icons/setting-prefrences-icon.svg';
import LockIcon from '../../assets/icons/setting-lock-icon.svg';
import AutoLockIcon from '../../assets/icons/setting-autolock-icon.svg';
import ArrowIcon from '../../assets/icons/setting-arrows-icon.svg';
import AppLogoIcon from '../../assets/icons/setting-appLogo-icon.svg';
import BrushIcon from '../../assets/icons/setting-brush-icon.svg';
import SettingLink from '../components/SettingLink';
import * as Colors from '../../config/colors';

/* =============================================================================
<SettingsScreen />
============================================================================= */
const SettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);

  return (
    <Container>
      <TabHeader
        type="secondary"
        title={<FormattedMessage defaultMessage="Settings" />}
      />
      <Content style={styles.content}>
        <SettingLink
          to="AddWallet"
          stackName="WalletStack"
          icon={<AddWalletIcon />}
          title={<FormattedMessage defaultMessage="Add Wallet" />}
        />
        <SettingLink
          to="ManageWallet"
          stackName="WalletStack"
          icon={<WalletIcon stroke={Colors.primary} />}
          title={<FormattedMessage defaultMessage="Manage Wallets" />}
        />
        <SettingLink
          to="ManageFriends"
          stackName="FriendsStack"
          icon={<FriendsIcon />}
          title={<FormattedMessage defaultMessage="Manage Friends" />}
        />
        <SettingLink
          to="Preferences"
          stackName="SettingsStack"
          icon={<PreferencesIcon />}
          title={<FormattedMessage defaultMessage="Preferences" />}
        />
        <SettingLink
          to="ChangePassword"
          stackName="SettingsStack"
          icon={<LockIcon />}
          title={<FormattedMessage defaultMessage="Change Password" />}
        />
        <SettingLink
          to="AutoLock"
          stackName="SettingsStack"
          icon={<AutoLockIcon />}
          title={<FormattedMessage defaultMessage="Auto Lock" />}
        />
        <SettingLink
          to="ImportExport"
          stackName="SettingsStack"
          icon={<ArrowIcon />}
          title={<FormattedMessage defaultMessage="Sync/Import/Export" />}
        />
        <SettingLink
          to="AboutKeysign"
          stackName="SettingsStack"
          icon={<AppLogoIcon />}
          title={<FormattedMessage defaultMessage="About Keysign" />}
        />
        <SettingLink
          to="ClearData"
          icon={<BrushIcon />}
          title={<FormattedMessage defaultMessage="Clear All Data" />}
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
  });

/* Export
============================================================================= */
export default SettingsScreen;
