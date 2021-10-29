import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

import {Text, Touchable} from '../../../common';
import * as Colors from '../../../config/colors';

import {makeGetFriendById} from '../../redux/selectors';

const FriendListItem = ({friend, selected, onPress}) => {
  const title = getFriendTitle(friend);
  const disabled = selected;

  const _handlePress = () => {
    onPress(friend?.id);
  };

  return (
    <Touchable
      style={styles.touchable}
      disabled={disabled}
      onPress={_handlePress}>
      <LinearGradient
        style={styles.gradient}
        colors={
          selected
            ? ['#a7c5f2', '#ffff', '#ffff']
            : ['#77a5e8', '#508ce2', '#1565D8']
        }
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <Text style={selected ? styles.txt1 : styles.txt2}>{title}</Text>
      </LinearGradient>
    </Touchable>
  );
};

const getFriendTitle = friend => {
  if (friend) {
    const [first, last] = friend.name.split(' ');
    return `${first[0]}${(last && last[0]) || first[1]}`.toUpperCase();
  }
  return null;
};

const styles = StyleSheet.create({
  touchable: {
    marginLeft: 17,
    backgroundColor: '#fff',
  },
  gradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40 / 2,
  },
  txt1: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.primary,
  },
  txt2: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.card,
  },
});

const mapStateToProps = () => {
  const getFriendById = makeGetFriendById();
  return (state, {id}) => ({
    friend: getFriendById(state, {id}),
  });
};

export default connect(mapStateToProps)(FriendListItem);
