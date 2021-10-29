import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

import View from './View';
import Text from './Text';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import * as Colors from '../config/colors';

/* =============================================================================
<TabHeader />
============================================================================= */
const TabHeader = ({title, primary, children, style, titleStyle}) => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);

  return (
    <View style={[styles.container, primary && styles.primary, style]}>
      <FocusAwareStatusBar
        translucent
        backgroundColor="transparent"
        barStyle={primary ? 'light-content' : 'dark-content'}
      />
      {title ? (
        <Text style={[styles.title, primary && styles.primaryTxt, titleStyle]}>
          {title}
        </Text>
      ) : (
        children
      )}
    </View>
  );
};

const getStyles = insets =>
  StyleSheet.create({
    container: {
      height: insets.top + 90,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: insets.top,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    primary: {
      backgroundColor: Colors.primary,
    },
    backBtn: {
      zIndex: 2,
      paddingVertical: insets.top,
      paddingHorizontal: 17,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Roboto-Medium',
    },
    primaryTxt: {
      color: Colors.card,
    },
  });

export default TabHeader;
