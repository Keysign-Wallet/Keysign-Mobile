import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

const Content = ({
  children,
  style,
  center,
  padding,
  alignItems,
  justifyContent,
  backgroundColor,
  scrollViewStyle,
  contentContainerStyle,
  ...props
}) => {
  const _layout = {
    alignItems: center ? 'center' : alignItems,
    justifyContent: center ? 'center' : justifyContent,
    padding,
    backgroundColor,
  };
  return (
    <ScrollView
      style={[styles.container, scrollViewStyle]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      {...props}>
      <View style={[styles.content, _layout, style]}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});

export default Content;
