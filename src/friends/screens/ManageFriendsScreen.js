import React from 'react';
import {connect} from 'react-redux';
import {Alert, StyleSheet} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';

import {
  Button,
  Content,
  Container,
  StackHeader,
  FocusAwareStatusBar,
} from '../../common';
import FriendList from '../components/FriendList';
import FriendDetails from '../components/FriendDetails';

import {getLoading, getSelectedFriend} from '../redux/selectors';
import {deleteFriend as deleteFriendAction} from '../redux/actions';

/* =============================================================================
<ManageFriendsScreen />
============================================================================= */
const ManageFriendsScreen = ({selectedFriendId, loading, deleteFriend}) => {
  const intl = useIntl();
  const disabled = loading;

  const _handleDeletePress = () => {
    if (!disabled) {
      Alert.alert(
        intl.formatMessage({defaultMessage: 'Confirmation'}),
        intl.formatMessage({
          defaultMessage: 'Are you sure you want to delete this friend?',
        }),
        [
          {
            text: intl.formatMessage({defaultMessage: 'No'}),
            style: 'cancel',
          },
          {
            text: intl.formatMessage({defaultMessage: 'Yes'}),
            onPress: () => {
              deleteFriend(selectedFriendId);
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
        title={<FormattedMessage defaultMessage="Manage Friends" />}
      />
      <Content style={styles.content}>
        <FriendList />
        <FriendDetails />
        {!!selectedFriendId && (
          <Button
            style={styles.btn}
            title={<FormattedMessage defaultMessage="DELETE FRIEND" />}
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
  loading: getLoading(state),
  selectedFriendId: getSelectedFriend(state)?.id,
});

const mapDispatchToProps = {
  deleteFriend: deleteFriendAction,
};

/* Export
============================================================================= */
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageFriendsScreen);
