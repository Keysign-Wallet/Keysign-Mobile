import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Pagination} from 'react-native-snap-carousel';
import {FormattedMessage} from 'react-intl';

import {Button} from '../../common';
import AppIntroCarousel from '../components/AppIntroCarousel';
import AppIntroBackground from '../components/AppIntroBackground';
import IconImage1 from '../../assets/icons/app-intro-image-1.svg';
import IconImage2 from '../../assets/icons/app-intro-image-2.svg';
import IconImage3 from '../../assets/icons/app-intro-image-3.svg';
import * as Colors from '../../config/colors';

/* =============================================================================
<AppIntroScreen />
============================================================================= */
const AppIntroScreen = ({navigation}) => {
  const carousel = useRef();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const _handleSnapToItem = index => {
    setCarouselIndex(index);
  };

  const _handlePress = () => {
    if (carouselIndex === 2) {
      navigation.navigate('CreatePassword');
    } else {
      carousel.current.snapToNext();
    }
  };

  return (
    <AppIntroBackground>
      <AppIntroCarousel
        ref={carousel}
        items={CAROUSEL_ITEMS}
        onSnapToItem={_handleSnapToItem}
      />
      <Pagination
        dotsLength={CAROUSEL_ITEMS.length}
        activeDotIndex={carouselIndex}
        dotStyle={styles.paginationDotActive}
        inactiveDotStyle={styles.paginationDotInactive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <Button
        type="secondary"
        style={styles.nextBtn}
        onPress={_handlePress}
        title={
          carouselIndex === 2 ? (
            <FormattedMessage defaultMessage="GET STARTED" />
          ) : (
            <FormattedMessage defaultMessage="NEXT " />
          )
        }
      />
    </AppIntroBackground>
  );
};

const CAROUSEL_ITEMS = [
  {
    title: <FormattedMessage defaultMessage="LEAP WALLET" />,
    description: (
      <FormattedMessage defaultMessage="Keysign is the best way to access your LEAP wallet on the chain." />
    ),
    source: <IconImage1 />,
  },
  {
    title: <FormattedMessage defaultMessage="MANAGE LEAP" />,
    description: (
      <FormattedMessage defaultMessage="Manage LEAP assets, and connect to LEAP applications." />
    ),
    source: <IconImage2 />,
  },
  {
    title: <FormattedMessage defaultMessage="KEYSIGN" />,
    description: (
      <FormattedMessage defaultMessage="Simple, lightweight, and secure. Get started to connect or create your LEAP wallet." />
    ),
    source: <IconImage3 />,
  },
];

const styles = StyleSheet.create({
  paginationDotActive: {
    width: 35,
    height: 10,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  paginationDotInactive: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: Colors.border,
  },
  nextBtn: {
    borderRadius: 15,
    marginVertical: 0,
    marginHorizontal: 30,
  },
});

/* Export
============================================================================= */
export default AppIntroScreen;
