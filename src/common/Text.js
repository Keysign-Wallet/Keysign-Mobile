import React from 'react';
import {Text} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<CustomText />
============================================================================= */
const CustomText = ({
  flex,
  style,
  light,
  align,
  color,
  children,
  fontSize,
  fontFamily,
  lineHeight,
  textTransform,
  numberOfLines,
  marginVertical,
  marginHorizontal,
  ...props
}) => {
  const _style = {
    flex,
    color: color || (light ? Colors.primary : Colors.text),
    fontSize,
    fontFamily,
    lineHeight,
    textTransform,
    marginVertical,
    marginHorizontal,
    textAlign: align,
  };

  return (
    <Text numberOfLines={numberOfLines} style={[_style, style]} {...props}>
      {children}
    </Text>
  );
};

/* Default Props
============================================================================= */
CustomText.defaultProps = {
  fontSize: 16,
  align: 'left',
  marginVertical: 0,
  marginHorizontal: 0,
  numberOfLines: null,
  fontFamily: 'Roboto-Regular',
};

/* Export
============================================================================= */
export default CustomText;
