import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {Checkbox} from '../../../common';

import {getShowFee} from '../../redux/selectors';
import {setShowFee as setShowFeeAction} from '../../redux/actions';

/* =============================================================================
<HistoryListHeader />
============================================================================= */
const HistoryListHeader = ({showFee, setShowFee}) => {
  return (
    <Checkbox
      checked={showFee}
      onChange={setShowFee}
      style={styles.container}
      label={<FormattedMessage defaultMessage="Show Fee" />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    paddingHorizontal: 17,
  },
});

const mapStateToProps = state => ({
  showFee: getShowFee(state),
});

const mapDispatchToProps = {
  setShowFee: setShowFeeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryListHeader);
