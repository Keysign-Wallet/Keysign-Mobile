import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet} from 'react-native';

import View from './View';
import Text from './Text';
import Touchable from './Touchable';
import * as Colors from '../config/colors';

/* =============================================================================
<TabBar />
============================================================================= */
const TabBar = ({type, style, navigationState, jumpTo}) => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets, {type});

  return (
    <View style={[styles.container, style]}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      {navigationState.routes.map((route, index) => (
        <Touchable
          flex={1}
          disabled={index === navigationState.index}
          alignItems="center"
          onPress={() => jumpTo(route.key)}>
          <View
            style={[
              styles.item,
              index === navigationState.index && styles.itemActive,
            ]}>
            <Text
              defaultMessage={route.title}
              style={[
                styles.text,
                index === navigationState.index && styles.textActive,
              ]}>
              {route.title}
            </Text>
          </View>
        </Touchable>
      ))}
    </View>
  );
};

TabBar.defaultProps = {
  type: 'primary',
};

const getStyles = (insets, {type}) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: insets.top + 60,
      flexDirection: 'row',
      paddingTop: insets.top,
      backgroundColor: type === 'primary' ? Colors.primary : Colors.secondary,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    item: {
      flex: 1,
    },
    text: {
      color: Colors.card,
      opacity: 0.75,
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Roboto-Regular',
    },
    textActive: {
      opacity: 1,
      fontFamily: 'Roboto-Bold',
    },
  });

export default TabBar;
