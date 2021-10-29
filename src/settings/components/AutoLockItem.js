import React from 'react';
import {StyleSheet} from 'react-native';

import {Checkbox, Text, View} from '../../common';

import * as Colors from '../../config/colors';

const AutoLockItem = ({title, description, value, disabled, onCheck}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.titleTxt, disabled && styles.disabledTxt]}>
          {title}
        </Text>
        <Checkbox checked={value} disabled={disabled} onChange={onCheck} />
      </View>
      <Text style={[styles.description, disabled && styles.disabledTxt]}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  titleContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: {
    fontSize: 14,
    lineHeight: 15,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Roboto-Light',
  },
  disabledTxt: {
    color: '#d1d1d1',
  },
});

export default AutoLockItem;
