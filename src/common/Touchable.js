import React from 'react';
import {Pressable} from 'react-native';

/* Constant Shadow properties
============================================================================= */
const shadowStyle = {
  shadowColor: '#000',
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  elevation: 5,
};

/* =============================================================================
<Touchable />
============================================================================= */
const Touchable = ({
  flex,
  style,
  margin,
  center,
  shadow,
  padding,
  onPress,
  children,
  disabled,
  alignItems,
  justifyContent,
  marginVertical,
  backgroundColor,
  paddingVertical,
  marginHorizontal,
  paddingHorizontal,
  ...props
}) => {
  const _style = {
    flex,
    margin,
    padding,
    marginVertical,
    backgroundColor,
    paddingVertical,
    marginHorizontal,
    paddingHorizontal,
    justifyContent: center ? 'center' : justifyContent,
    alignItems: center ? 'center' : alignItems,
  };

  return (
    <Pressable
      style={[_style, shadow && shadowStyle, style]}
      disabled={disabled}
      activeOpacity={0.5}
      onPress={onPress}
      {...props}>
      {children}
    </Pressable>
  );
};

/* Default Props
============================================================================= */
Touchable.defaultProps = {
  flex: 0,
  margin: null,
  shadow: false,
  center: false,
  padding: null,
  marginVertical: null,
  paddingVertical: null,
  marginHorizontal: null,
  paddingHorizontal: null,
  justifyContent: undefined,
  backgroundColor: 'transparent',
};

/* Exports
============================================================================= */
export default Touchable;
