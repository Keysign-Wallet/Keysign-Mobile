import React from 'react';
import {View} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<Container />
============================================================================= */
const Container = ({
  style,
  center,
  padding,
  children,
  alignItems,
  justifyContent,
  backgroundColor,
}) => {
  const _style = {
    flex: 1,
    padding,
    alignItems: center ? 'center' : alignItems,
    justifyContent: center ? 'center' : justifyContent,
    backgroundColor,
  };

  return <View style={[_style, style]}>{children}</View>;
};

/* Default Props
============================================================================= */
Container.defaultProps = {
  center: false,
  backgroundColor: Colors.background,
};

/* Export
============================================================================= */
export default Container;
