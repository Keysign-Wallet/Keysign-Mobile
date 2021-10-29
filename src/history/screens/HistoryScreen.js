import React from 'react';
import {FormattedMessage} from 'react-intl';

import HistoryList from '../components/HistoryList';

import {Container, StackHeader} from '../../common';

/* =============================================================================
<HistoryScreen />
============================================================================= */
const HistoryScreen = () => {
  return (
    <Container>
      <StackHeader title={<FormattedMessage defaultMessage="History" />} />
      <HistoryList />
    </Container>
  );
};

/* Export
============================================================================= */
export default HistoryScreen;
