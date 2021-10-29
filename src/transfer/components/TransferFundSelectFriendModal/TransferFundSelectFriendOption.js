import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Text, Touchable, View} from '../../../common';
import * as Colors from '../../../config/colors';

import {makeGetFriendById} from '../../../friends/redux/selectors';

const TransferFundSelectFriendOption = ({friend, onPress}) => {
  const title = getFriendTitle(friend);
  const name = friend ? friend.name : '';
  const address = friend ? friend.id : '';

  const _handlePress = () => {
    onPress(friend);
  };

  return (
    <Touchable style={styles.container} onPress={_handlePress}>
      <View style={styles.circle}>
        <LinearGradient
          style={styles.gradient}
          colors={['#77a5e8', '#508ce2', '#1565D8']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <Text style={styles.circleTxt}>{title}</Text>
        </LinearGradient>
      </View>
      <View flex={1}>
        <Text fontSize={14}>{name}</Text>
        <Text fontSize={10}>{address}</Text>
      </View>
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  circle: {
    marginRight: 12,
    backgroundColor: '#fff',
  },
  gradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40 / 2,
  },
  circleTxt: {
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

export default connect(mapStateToProps)(TransferFundSelectFriendOption);
