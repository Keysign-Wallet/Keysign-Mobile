import React from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {View, Touchable, Text} from '../common';
import HomeIconActive from '../assets/icons/tab-home-icon.svg';
import WalletIcon from '../assets/icons/tab-wallet-icon.svg';
import ScanIcon from '../assets/icons/tab-scan-icon.svg';
import SettingsIcon from '../assets/icons/tab-settings-icon.svg';

import * as Colors from '../config/colors';

/* =============================================================================
<TabBar />
============================================================================= */
const TabBar = ({state, descriptors, navigation}) => {
  const insets = useSafeAreaInsets();
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const containerStyle = {
    height: insets.bottom + 60,
    paddingBottom: insets.bottom,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Touchable
            key={route.name}
            style={[styles.item, isFocused && styles.itemActive]}
            onPress={onPress}
            onLongPress={onLongPress}>
            {isFocused ? ICONS[index][1] : ICONS[index][0]}
            <Text style={styles.text}>{label}</Text>
          </Touchable>
        );
      })}
    </View>
  );
};

const ICONS = {
  0: [
    <HomeIconActive fill={Colors.text} />,
    <HomeIconActive fill={Colors.primary} />,
  ],
  1: [
    <WalletIcon stroke={Colors.text} />,
    <WalletIcon stroke={Colors.primary} />,
  ],
  2: [<ScanIcon fill={Colors.text} />, <ScanIcon fill={Colors.primary} />],
  3: [
    <SettingsIcon fill={Colors.text} />,
    <SettingsIcon fill={Colors.primary} />,
  ],
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  item: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    marginTop: 2,
  },
});

export default TabBar;
