import React from 'react';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';

import {Text, View} from '../../../common';
import TransferFundSelectFriendOption from './TransferFundSelectFriendOption';
import * as Colors from '../../../config/colors';

import {getAllIds} from '../../../friends/redux/selectors';

const TransferFundSelectFriendModal = ({
  visible,
  friends,
  onCancel,
  onSubmit,
}) => {
  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {friends.length > 0 ? (
            friends.map(friend => (
              <TransferFundSelectFriendOption
                id={friend}
                key={friend}
                onPress={onSubmit}
              />
            ))
          ) : (
            <View flex={1} center>
              <Text>
                <FormattedMessage defaultMessage="No Friends Yet" />
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  content: {
    width: '100%',
    height: Dimensions.get('window').height * 0.5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.card,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 60,
  },
});

const mapStateToProps = state => ({
  friends: getAllIds(state),
});

export default connect(mapStateToProps)(TransferFundSelectFriendModal);
