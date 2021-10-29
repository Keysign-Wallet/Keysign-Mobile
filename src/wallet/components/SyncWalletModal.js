import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet} from 'react-native';
import {FormattedMessage} from 'react-intl';

import ListBulletIcon from '../../assets/icons/list-bullet.svg';
import {Button, Card, Text, View} from '../../common';

import * as Colors from '../../config/colors';

const SyncWalletModal = ({visible, onCancel, onScan}) => {
  return (
    <Modal isVisible={visible}>
      <Card style={styles.show}>
        <Text style={styles.title}>
          <FormattedMessage defaultMessage="Steps to sync your wallets" />
        </Text>
        <View style={styles.stepContainer}>
          <ListBulletIcon />
          <Text style={styles.step}>
            <FormattedMessage defaultMessage="Open your Browser wallet" />
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <ListBulletIcon />
          <Text style={styles.step}>
            <FormattedMessage defaultMessage="Go to settings > Sync/Import/Export" />
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <ListBulletIcon />
          <Text style={styles.step}>
            <FormattedMessage defaultMessage="Click the “Sync Mobile” button" />
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <ListBulletIcon />
          <Text style={styles.step}>
            <FormattedMessage defaultMessage="Enter your password with no one around." />
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <ListBulletIcon />
          <Text style={styles.step}>
            <FormattedMessage defaultMessage="Scan the QR code To begin the SYNC" />
          </Text>
        </View>
        <View horizontal style={styles.btnContainer}>
          <Button
            type="light"
            onPress={onCancel}
            title={<FormattedMessage defaultMessage="Cancel" />}
          />
          <Button
            type="primary"
            onPress={onScan}
            title={<FormattedMessage defaultMessage="Scan" />}
          />
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  show: {
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 0.4,
    borderColor: Colors.placeholder,
    zIndex: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 28,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  step: {
    fontSize: 12,
    marginLeft: 10,
  },
  btnContainer: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});

export default SyncWalletModal;
