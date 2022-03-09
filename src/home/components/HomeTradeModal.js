import React from 'react';
import Modal from 'react-native-modal';
import {Alert, Linking, StyleSheet} from 'react-native';
import {FormattedMessage} from 'react-intl';

import ListBulletIcon from '../../assets/icons/list-bullet.svg';
import {Button, Card, Text, View} from '../../common';
import * as Colors from '../../config/colors';

const HomeTradeModal = ({visible, onCancel}) => {
  const _handleOpenTradeNow = async () => {
    const url = 'https://discord.com/invite/K965xhfZde';

    try {
      await Linking.openURL(url);
      onCancel();
    } catch (e) {
      Alert.alert(`Error: ${e.message}`);
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}>
      <Card style={styles.show}>
        <Text style={styles.title}>
          <FormattedMessage defaultMessage="Trade on TNBCROW" />
        </Text>
        <View style={styles.stepContainer}>
          <ListBulletIcon />
          <Text style={styles.step}>
            <FormattedMessage defaultMessage="Keysign does not own TNBCROW" />
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <ListBulletIcon />
          <Text style={styles.step}>
            <FormattedMessage defaultMessage="Keysign is not liable for this service." />
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <ListBulletIcon />
          <Text style={styles.step}>
            <FormattedMessage defaultMessage="TNBCROW is a P2P trading community." />
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <ListBulletIcon />
          <Text style={styles.step}>
            <FormattedMessage defaultMessage="Always use an escrow, they are currently free." />
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <ListBulletIcon />
          <Text style={styles.step}>
            <FormattedMessage defaultMessage="You will be sent to a discord community." />
          </Text>
        </View>
        <Button
          type="light"
          title={<FormattedMessage defaultMessage="Trade Now" />}
          style={styles.comingSoonBtn}
          onPress={_handleOpenTradeNow}
        />
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
  comingSoonBtn: {
    alignSelf: 'center',
  },
});

export default HomeTradeModal;
