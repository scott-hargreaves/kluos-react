import React from 'react';

import { configureStore } from '../state/store';
import LandingPageContainer from './containers/LandingPage';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider as ReduxProvider } from 'react-redux';

const palette = {
  primary: {
    main: '#212121'
  },
  secondary: {
    main: '#B71C1C'
  }
};

const themeName = 'Mine Shaft Thunderbird Deer Mouse';
const kluosTheme = createMuiTheme({ palette, themeName });
const reduxStore = configureStore(window._kluos_initial_state );

class App extends React.Component {

  render() {
    return (
        <div className="application">
          <MuiThemeProvider theme={kluosTheme}>
              <ReduxProvider store={reduxStore}>
                  <LandingPageContainer />
              </ReduxProvider>
          </MuiThemeProvider>
        </div>
    );
  }

}

export default App;