import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {View, PanResponder, StyleSheet} from 'react-native';

import {getSettings} from '../../settings/redux/selectors';
import {getAuthentication} from '../../auth/redux/selectors';
import {logout as logoutAction} from '../../auth/redux/actions';

/* =============================================================================
<AutoLockListener />
============================================================================= */
const AutoLockListener = ({children, authenticated, settings, logout}) => {
  const _idleTimerId = useRef(false);
  const _panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        _resetInactivityTimeout();
      },
    }),
  ).current;

  // Start IDLE timeout
  useEffect(() => {
    _resetInactivityTimeout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, settings]);

  const _resetInactivityTimeout = () => {
    clearTimeout(_idleTimerId.current);
    if (
      authenticated &&
      settings &&
      settings.autoLock === 'idle' &&
      settings.idleLockTime
    ) {
      _idleTimerId.current = setTimeout(() => {
        // Logout user on IDLE
        logout();
      }, settings.idleLockTime * 60 * 1000);
    }
  };

  return (
    <View style={styles.container} {..._panResponder.panHandlers}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  settings: getSettings(state),
  authenticated: getAuthentication(state),
});

const mapDispatchToProps = {
  logout: logoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoLockListener);
