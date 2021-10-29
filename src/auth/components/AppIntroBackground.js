import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image, StatusBar, StyleSheet, useWindowDimensions} from 'react-native';

import {Container, View} from '../../common';
import BackgroundImage1 from '../../assets/images/app-intro-background-1.png';
import BackgroundImage2 from '../../assets/images/app-intro-background-2.png';

/* =============================================================================
<AppIntroBackground />
============================================================================= */
const AppIntroBackground = ({children}) => {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const styles = getStyles(insets, dimensions);

  return (
    <Container style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Image style={styles.background1} source={BackgroundImage1} />
      <Image style={styles.background2} source={BackgroundImage2} />
      <View style={styles.content}>{children}</View>
    </Container>
  );
};

const getStyles = (insets, dimensions) =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },
    background1: {
      position: 'absolute',
      width: '100%',
      height: dimensions.height * 0.7,
      zIndex: 1,
    },
    background2: {
      position: 'absolute',
      width: '100%',
      height: dimensions.height * 0.7,
      zIndex: 2,
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
      paddingTop: insets.top + 30,
      paddingBottom: insets.bottom + 30,
      zIndex: 3,
    },
  });

/* Export
============================================================================= */
export default AppIntroBackground;
