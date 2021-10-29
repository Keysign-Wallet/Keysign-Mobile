import React from 'react';
import {StyleSheet} from 'react-native';

import {Text, View} from '../../common';

import * as Colors from '../../config/colors';

const HandshakeInfoItem = ({title, description}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  titleContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  description: {
    fontSize: 12,
    fontFamily: 'Roboto-Light',
  },
});

export default HandshakeInfoItem;
