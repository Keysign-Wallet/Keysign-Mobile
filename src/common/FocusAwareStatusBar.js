import React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

/* =============================================================================
<FocusAwareStatusBar />
============================================================================= */
const FocusAwareStatusBar = props => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
};

/* Export
============================================================================= */
export default FocusAwareStatusBar;
