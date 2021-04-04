import { Router, globalHistory } from '@reach/router';
import React, { useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Stand from './Stand';
import FrontModal from '../Admin/components/FrontModal';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#3efcfe',
    },
  },
  typography: {
    fontFamily: `'Montserrat', sans-serif`,
    button: {
      fontWeight: 600,
    },
  },
});

export default function MainView({ data, db }) {
  useEffect(() => {
    globalHistory.listen(({ action }) => {
      if (action === 'PUSH') {
        window.scrollTo(0, 0);
      }
    });
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <FrontModal>
          <div className="main">
            <div className="main-content">
              <Router>
                {/* <div path="/">home</div> */}
                <Stand
                  liveLink={data.liveLink}
                  ticketLink={data.ticketLink}
                  stands={data.stands}
                  path="/cabina/:id"
                />
              </Router>
            </div>
            <div className="main-spacer" />
          </div>
        </FrontModal>
      </ThemeProvider>
    </>
  );
}
