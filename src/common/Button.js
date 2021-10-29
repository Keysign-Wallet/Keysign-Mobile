import React from 'react';
import {Text, StyleSheet, Pressable, ActivityIndicator} from 'react-native';

import * as Colors from '../config/colors';

/* =============================================================================
<Button />
============================================================================= */
const Button = ({
  flex,
  type,
  title,
  block,
  style,
  width,
  height,
  onPress,
  loading,
  disabled,
  children,
  textStyle,
}) => {
  const _layout = {
    flex,
    width: block ? '100%' : width,
    height,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.5}
      style={[
        _layout,
        styles.container,
        type === 'primary' ? styles.primary : undefined,
        type === 'secondary' ? styles.secondary : undefined,
        type === 'light' ? styles.light : undefined,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={
            type === 'primary'
              ? Colors.background
              : type === 'primary'
              ? Colors.background
              : type === 'light'
              ? Colors.border
              : Colors.text
          }
        />
      ) : title ? (
        <Text
          style={[
            styles.txt,
            type === 'primary' ? styles.txtPrimary : undefined,
            type === 'secondary' ? styles.txtSecondary : undefined,
            type === 'light' ? styles.txtLight : undefined,
            textStyle,
          ]}>
          {title}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

Button.defaultProps = {
  type: 'primary',
  height: 50,
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderRadius: 15,
  },
  primary: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  secondary: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary,
  },
  light: {
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
  txt: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  txtPrimary: {
    color: Colors.background,
  },
  txtSecondary: {
    color: Colors.background,
  },
  txtLight: {
    color: Colors.primary,
  },
});

export default Button;
