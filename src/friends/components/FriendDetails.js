import React from 'react';
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import {StyleSheet} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';

import {View, Text, TextInput, Touchable} from '../../common';
import ClipBoardIcon from '../../assets/icons/clipboard-icon.svg';

import {getSelectedFriend} from '../redux/selectors';

/* =============================================================================
<FriendDetails />
============================================================================= */
const FriendDetails = ({friend}) => {
  const intl = useIntl();

  if (friend) {
    const userName = friend.name;
    const accountNumber = friend.id;

    const _handleCopyToClipBoardPress = value => () => {
      Clipboard.setString(value);
      Toast.show(
        intl.formatMessage(
          {defaultMessage: 'Copied'},
          {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          },
        ),
      );
    };

    return (
      <>
        <Text style={styles.userNameTxt}>{userName}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label={<FormattedMessage defaultMessage="Account Number" />}
            value={accountNumber}
            editable={false}
            inputStyle={styles.input}
          />
          <Touchable
            style={styles.copyBtn}
            onPress={_handleCopyToClipBoardPress(accountNumber)}>
            <ClipBoardIcon />
          </Touchable>
        </View>
      </>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  userNameTxt: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
  },
  input: {
    textAlign: 'left',
  },
  inputContainer: {
    position: 'relative',
  },
  copyBtn: {
    position: 'absolute',
    top: 16,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
});

const mapStateToProp = state => ({
  friend: getSelectedFriend(state),
});

/* Export
============================================================================= */
export default connect(mapStateToProp, null)(FriendDetails);
