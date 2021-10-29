import React from 'react';
import {FormattedDate} from 'react-intl';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, View} from 'react-native';

import {Text} from '../../../common';
import * as Colors from '../../../config/colors';

const HistoryListSectionHeader = ({title}) => {
  return (
    <View style={styles.container}>
      <Text fontSize={12} fontFamily="Roboto-Medium">
        <FormattedDate value={title} month="long" year="numeric" />
      </Text>
      <FontAwesome5Icon name="chevron-down" color={Colors.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.banner,
  },
});

export default HistoryListSectionHeader;
