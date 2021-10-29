import React from 'react';
import {FormattedMessage} from 'react-intl';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {Button, Container, Content, StackHeader, Text} from '../../common';

import {forgotPassword as forgotPasswordAction} from '../redux/actions';

/* =============================================================================
<ForgotPasswordScreen />
============================================================================= */
const ForgotPasswordScreen = ({forgotPassword}) => {
  const _handleConfirmPress = () => {
    forgotPassword();
  };

  return (
    <Container>
      <StackHeader
        title={<FormattedMessage defaultMessage="Clear All Data" />}
      />
      <Content style={styles.content}>
        <Text style={styles.txt}>
          <FormattedMessage
            defaultMessage="If you forgot your password, you can clear your
          data but will have to enter all your keys again."
          />
        </Text>
        <Button
          onPress={_handleConfirmPress}
          title={<FormattedMessage defaultMessage="CONFIRM" />}
        />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 17,
  },
  txt: {
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 30,
  },
});

const mapDispatchToProps = {
  forgotPassword: forgotPasswordAction,
};

/* Export
============================================================================= */
export default connect(null, mapDispatchToProps)(ForgotPasswordScreen);
