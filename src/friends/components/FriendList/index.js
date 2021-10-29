import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {ScrollView, StyleSheet} from 'react-native';

import FriendListItem from './FriendListItem';
import FriendListAddButton from './FriendListAddButton';

import {getAllIds, getSelectedFriend} from '../../redux/selectors';
import {selectFriend as selectFriendAction} from '../../redux/actions';

const FriendList = ({friends, selectedFriendId, selectFriend}) => {
  // Set first friend as selected
  useEffect(() => {
    if (friends.length && !selectedFriendId) {
      selectFriend(friends[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends.length]);

  const _handleSelectWallet = id => {
    selectFriend(id);
  };

  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}>
      {friends.map(friendId => (
        <FriendListItem
          id={friendId}
          key={friendId}
          selected={selectedFriendId === friendId}
          onPress={_handleSelectWallet}
        />
      ))}
      <FriendListAddButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 40,
    marginHorizontal: -17,
  },
  content: {
    paddingRight: 17,
    alignItems: 'flex-start',
  },
});

const mapStateToProps = state => ({
  friends: getAllIds(state),
  selectedFriendId: getSelectedFriend(state)?.id,
});

const mapDispatchToProps = {
  selectFriend: selectFriendAction,
};

const propsAreEqual = (prevProps, nextProps) =>
  prevProps.friends.toString() === nextProps.friends.toString() &&
  prevProps.selectedFriendId === nextProps.selectedFriendId;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(FriendList, propsAreEqual));
