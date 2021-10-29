import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet} from 'react-native';

import View from './View';
import Text from './Text';
import Touchable from './Touchable';
import BackBtnIcon from '../assets/icons/backbtn-icon.svg';
import BackBtnWhite from '../assets/icons/backbtn-white.svg';
import * as Colors from '../config/colors';

/* =============================================================================
<StackHeader />
============================================================================= */
const StackHeader = ({title, type, onCancel, ...props}) => {
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
    <View
      style={[
        styles.container,
        type === 'primary' ? styles.primary : styles.secondary,
      ]}>
      <StatusBar
        {...props}
        translucent
        backgroundColor="transparent"
        barStyle={type === 'primary' ? 'light-content' : 'dark-content'}
      />
      <Touchable style={styles.backBtn} onPress={_handleBack}>
        {type === 'primary' ? <BackBtnWhite /> : <BackBtnIcon />}
      </Touchable>
      <Text
        style={[
          styles.title,
          type === 'primary' ? styles.primaryTxt : styles.secondaryTxt,
        ]}>
        {title}
      </Text>
    </View>
  );
};

StackHeader.defaultProps = {
  statusBarProps: {
    translucent: true,
    barStyle: 'light-content',
  },
};

const getStyles = insets =>
  StyleSheet.create({
    container: {
      height: insets.top + 70,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: insets.top + 40,
    },
    primary: {
      height: insets.top + 130,
      paddingBottom: 60,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      backgroundColor: Colors.primary,
    },
    secondary: {
      marginBottom: 60,
      backgroundColor: Colors.card,
    },
    backBtn: {
      zIndex: 2,
      paddingVertical: insets.top,
      paddingHorizontal: 17,
    },
    title: {
      fontSize: 18,
      fontWeight: '500',
      paddingRight: 20,
      fontFamily: 'Roboto-Medium',
    },
    primaryTxt: {
      color: Colors.card,
    },
    secondaryTxt: {
      color: Colors.primary,
    },
  });

export default StackHeader;
