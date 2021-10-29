import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';

import {Text, Touchable, View} from '../../common';
import * as Colors from '../../config/colors';

import {getSelectedWallet} from '../../wallet/redux/selectors';

/* =============================================================================
<HomeAction />
============================================================================= */
const HomeAction = ({title, icon, onPress}) => {
  return (
    <Touchable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 60,
    paddingHorizontal: 12,
  },
  iconContainer: {
    width: '100%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: Colors.primary,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  wallet: getSelectedWallet(state),
});

/* Export
============================================================================= */
export default connect(mapStateToProps)(HomeAction);
