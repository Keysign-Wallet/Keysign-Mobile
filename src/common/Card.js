import React from 'react';
import {StyleSheet, View} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<Card />
============================================================================= */
const Card = ({flex, style, width, height, children, backgroundColor}) => {
  const _style = {
    width,
    height,
    flex,
    backgroundColor: backgroundColor || Colors.card,
  };

  return <View style={[styles.container, _style, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 4,
    backgroundColor: Colors.card,
  },
});

export default Card;
