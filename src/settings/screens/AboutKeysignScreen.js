import React from 'react';
import {FormattedMessage} from 'react-intl';
import {StyleSheet} from 'react-native';

import {Container, Content, StackHeader, Text} from '../../common';

import * as Colors from '../../config/colors';

/* =============================================================================
<AboutKeysignScreen />
============================================================================= */
const AboutKeysignScreen = () => {
  return (
    <Container>
      <StackHeader
        type="primary"
        title={<FormattedMessage defaultMessage="About Keysign" />}
      />
      <Content style={styles.content}>
        <Text style={styles.keysignVer}>
          <FormattedMessage
            defaultMessage="Keysign {version}"
            values={{version: '0.0.5'}}
          />
        </Text>
        <Text style={styles.para}>
          <FormattedMessage defaultMessage="Keysign mobile application was created to work with" />{' '}
          <Text style={styles.link}>
            <FormattedMessage defaultMessage="LEAPCHAIN Blockchain" />
          </Text>
        </Text>
        <Text style={styles.para}>
          <FormattedMessage defaultMessage="It was developed and designed by both" />{' '}
          <Text style={styles.link}>
            <FormattedMessage defaultMessage="MrSky" />{' '}
          </Text>
          <FormattedMessage defaultMessage="and" />
          <Text style={styles.link}>
            <FormattedMessage defaultMessage="Abhay." />{' '}
          </Text>
        </Text>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 60,
    paddingHorizontal: 17,
  },
  keysignVer: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Colors.primary,
    marginBottom: 30,
  },
  para: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    lineHeight: 14,
    marginBottom: 15,
  },
  link: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    textDecorationLine: 'underline',
  },
});

/* Export
============================================================================= */
export default AboutKeysignScreen;
