import {useEffect} from 'react';
import {connect} from 'react-redux';
import {Linking} from 'react-native';

import {getAuthentication} from '../../auth/redux/selectors';

const HandshakeListener = ({navigation, authenticated}) => {
  // Setup deep linking
  useEffect(() => {
    if (authenticated) {
      Linking.getInitialURL()
        .then(url => {
          _handleDeepLink(url);
        })
        .catch(() => {});
      const unsubscribe = Linking.addEventListener('url', ({url}) => {
        _handleDeepLink(url);
      });

      return () => {
        unsubscribe.remove();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  const _handleDeepLink = data => {
    const url = new URL(data);

    if (url.hostname === 'verify') {
      navigation.navigate('HandshakeStack', {
        screen: 'HandshakeVerify',
        params: {
          code: url.searchParams.get('code'),
          address: url.searchParams.get('address'),
          redirectUrl: url.searchParams.get('redirect_url'),
        },
      });
    }

    if (url.hostname === 'transfer') {
      navigation.navigate('HandshakeStack', {
        screen: 'HandshakeTransfer',
        params: {
          address: url.searchParams.get('address'),
          amount: url.searchParams.get('amount'),
          memo: url.searchParams.get('memo'),
          redirectUrl: url.searchParams.get('redirect_url'),
        },
      });
    }
  };

  return null;
};

const mapStateToProps = state => ({
  authenticated: getAuthentication(state),
});

export default connect(mapStateToProps)(HandshakeListener);
