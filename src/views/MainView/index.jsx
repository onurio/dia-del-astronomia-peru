import { Router, globalHistory, navigate } from '@reach/router';
import React, { useContext, useEffect } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Stand from './Stand';
import FrontModal from '../Admin/components/FrontModal';
import Home from './Home';
import Start from './Start';
import { UserContext } from '../../App';
import Cuy from './Cuy';
import './index.scss';

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

export default function MainView({ data, db, fx, checkAmbience }) {
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    globalHistory.listen(({ action }) => {
      fx('button');
      if (action === 'PUSH') {
        window.scrollTo(0, 0);
      }
    });
    if (!userDetails.start) {
      navigate('/start');
    } else {
      fx('ambience');
    }

    window.addEventListener('click', checkAmbience);
    return () => window.removeEventListener('click', checkAmbience);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <FrontModal fx={fx}>
          <div className="main">
            <div className="main-content">
              <Router>
                <Start fx={fx} path="/start" />
                <Cuy fx={fx} data={data} path="/interior" />
                <Home fx={fx} data={data} path="/" />
                <Stand
                  fx={fx}
                  data={data}
                  stands={data.stands}
                  path="/cabina/:id"
                />
              </Router>
            </div>
            <div className="main-spacer" />
          </div>
          <div
            style={{
              backgroundColor: 'black',
              color: 'white',
              fontSize: 12,
              padding: '2px 0',
              width: '100%',
            }}
          >
            Copyright 2021 &#169; Todos los derechos reservados. Diseñado por
            &nbsp;
            <a
              className="portfolio-link"
              rel="noreferrer"
              target="_blank"
              href="https://www.instagram.com/hibridoxet/"
            >
              Elsa Bustamante
            </a>
            &nbsp; y &nbsp;
            <a
              className="portfolio-link"
              rel="noreferrer"
              target="_blank"
              href="https://omrinuri.com"
            >
              Omri Nuri
            </a>{' '}
          </div>
        </FrontModal>
      </ThemeProvider>
    </>
  );
}
