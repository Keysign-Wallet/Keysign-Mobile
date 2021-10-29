import React from 'react';
import {Provider} from 'react-redux';

import AppNavigation from './navigation/AppNavigation';
import configureStore from './redux/configureStore';

const store = configureStore();

/* =============================================================================
<App />
============================================================================= */
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

/* Export
============================================================================= */
export default App;
