import {useEffect} from 'react';
import {connect} from 'react-redux';

import {getActiveBank} from '../redux/selectors';
import {getAuthentication} from '../../auth/redux/selectors';
import {getBankConfig as getBankConfigAction} from '../redux/actions';

/* =============================================================================
<BanksConfigListener />
============================================================================= */
const BanksConfigListener = ({authenticated, activeBank, getBankConfig}) => {
  // Get active bank config
  useEffect(() => {
    if (authenticated && activeBank) {
      getBankConfig(activeBank);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, activeBank]);

  return null;
};

const mapStateToProps = state => ({
  activeBank: getActiveBank(state),
  authenticated: getAuthentication(state),
});

const mapDispatchToProps = {
  getBankConfig: getBankConfigAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BanksConfigListener);
