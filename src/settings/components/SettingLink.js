import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Text, Touchable, View} from '../../common';
import * as Colors from '../../config/colors';

/* =============================================================================
<SettingLink />
============================================================================= */
const SettingLink = ({to, icon, title, stackName}) => {
  const navigation = useNavigation();

  const _handlePress = () => {
    if (stackName && to) {
      navigation.navigate(stackName, {
        screen: to,
      });
    } else {
      navigation.navigate(to);
    }
  };

  return (
    <Touchable style={styles.container} onPress={_handlePress}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 17,
    backgroundColor: Colors.primary,
  },
  iconContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30 / 2,
    backgroundColor: Colors.card,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 17,
    paddingVertical: 12,
  },
  title: {
    flex: 1,
    fontSize: 14,
    marginLeft: 17,
    color: Colors.card,
    fontFamily: 'Roboto-Medium',
  },
});

/* Export
============================================================================= */
export default SettingLink;
