import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {Text, Touchable} from '../../../common';
import * as Colors from '../../../config/colors';

const FriendListAddButton = ({title}) => {
  const navigation = useNavigation();

  const _handlePress = () => {
    navigation.navigate('FriendsStack', {screen: 'AddFriend'});
  };

  return (
    <Touchable style={styles.touchable} onPress={_handlePress}>
      <LinearGradient
        style={styles.gradient}
        colors={['#77a5e8', '#508ce2', '#1565D8']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <Text style={styles.txt2}>{title}</Text>
      </LinearGradient>
      <FontAwesome5Icon style={styles.plus} name="plus" />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  touchable: {
    position: 'relative',
    marginLeft: 17,
    paddingRight: 8,
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
  plus: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default FriendListAddButton;
