import React from 'react';
import {StyleSheet} from 'react-native';

import {View} from '../../../common';
import * as Colors from '../../../config/colors';

/* =============================================================================
<HistoryListItemSeparator />
============================================================================= */
const HistoryListItemSeparator = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    marginLeft: 36 + 17,
    backgroundColor: Colors.banner,
  },
});

export default HistoryListItemSeparator;
