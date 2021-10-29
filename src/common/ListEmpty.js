import * as React from 'react';
import {StyleSheet} from 'react-native';

import View from './View';
import Text from './Text';
import * as Colors from '../config/colors';

/* =============================================================================
<ListEmpty />
============================================================================= */
const ListEmpty = ({title}) => {
  return (
    <View style={styles.container}>
      <Text color={Colors.label}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListEmpty;
