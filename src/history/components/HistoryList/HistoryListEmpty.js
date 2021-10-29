import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {View, Text} from '../../../common';
import * as Colors from '../../../config/colors';

import {getLoading} from '../../redux/selectors';

/* =============================================================================
<HistoryListEmpty />
============================================================================= */
const HistoryListEmpty = ({loading}) => {
  return (
    <View style={styles.container}>
      <Text color={Colors.label}>
        {loading ? (
          <FormattedMessage defaultMessage="Loading..." />
        ) : (
          <FormattedMessage defaultMessage="No Data" />
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '20%',
  },
});

const mapStateToProps = state => ({
  loading: getLoading(state),
});

export default connect(mapStateToProps)(HistoryListEmpty);
