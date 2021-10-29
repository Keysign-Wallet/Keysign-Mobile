import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {StyleSheet, useWindowDimensions} from 'react-native';

import {Text, View} from '../../common';

import * as Colors from '../../config/colors';

/* =============================================================================
<AppIntroCarousel />
============================================================================= */
const AppIntroCarousel = React.forwardRef(({items, onSnapToItem}, ref) => {
  const {width: windowWidth} = useWindowDimensions();

  return (
    <Carousel
      layout={'default'}
      ref={ref}
      data={items}
      sliderWidth={windowWidth}
      itemWidth={windowWidth}
      useScrollView
      renderItem={renderItem}
      onSnapToItem={onSnapToItem}
    />
  );
});

const renderItem = ({item}) => (
  <View style={styles.itemContainer}>
    <View style={styles.svgContainer}>{item.source}</View>
    <View style={styles.txtContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  svgContainer: {
    marginTop: '20%',
  },
  txtContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginVertical: 20,
    color: Colors.placeholder,
  },
});

/* Export
============================================================================= */
export default AppIntroCarousel;
