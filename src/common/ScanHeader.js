import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet} from 'react-native';

import View from './View';
import Text from './Text';
import Touchable from './Touchable';
import BackBtnIcon from '../assets/icons/backbtn-icon.svg';
import * as Colors from '../config/colors';

/* =============================================================================
<ScanHeader
 />
============================================================================= */
const ScanHeader = ({title, onCancel, ...props}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const styles = getStyles(insets);

  const _handleBack = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        {...props}
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Touchable style={styles.backBtn} onPress={_handleBack}>
        <BackBtnIcon />
      </Touchable>
      <Text style={[styles.title]}>{title}</Text>
    </View>
  );
};

ScanHeader.defaultProps = {
  statusBarProps: {
    translucent: true,
    barStyle: 'light-content',
  },
};

const getStyles = insets =>
  StyleSheet.create({
    container: {
      position: 'relative',
      height: insets.top + 70,
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: insets.top + 30,
      marginBottom: 20,
    },
    backBtn: {
      paddingVertical: insets.top,
      paddingHorizontal: 17,
      zIndex: 2,
    },
    title: {
      fontSize: 24,
      position: 'absolute',
      top: insets.top + 30,
      left: 0,
      right: 0,
      color: Colors.text,
      textAlign: 'center',
      fontFamily: 'Roboto-Medium',
      zIndex: 1,
    },
  });

export default ScanHeader;
