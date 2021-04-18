import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import { Redirect, Router } from '@reach/router';
import Admin from './views/Admin/Admin';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './firebaseCred';
// import GeneralSettings from './views/Admin/GeneralSettings';
// import Artists from './views/Admin/Artists';
// import ArtistArtworks from './views/Admin/ArtistArtworks';
import MainView from './views/MainView';
import { getLinks, getLiveLink, getStands } from './utils/dbRequests';
import Stands from './views/Admin/Stands';
import GeneralSettings from './views/Admin/GeneralSettings';

Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
  return JSON.parse(this.getItem(key));
};

export const UserContext = React.createContext();

function App() {
  const auth = useRef();
  const db = useRef();
  const storage = useRef();
  const app = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({});
  const [userDetails, setUserDetails] = useState({ trivia: {}, coins: 0 });

  useEffect(() => {
    if (isLoaded) {
      localStorage.setObject('astronomia-peru', userDetails);
    }
  }, [userDetails]);

  const getData = async () => {
    let savedInfo = localStorage.getObject('astronomia-peru');
    if (savedInfo) {
      setUserDetails(savedInfo);
    }
    try {
      const { liveLink, ticketLink } = await getLinks(db.current);
      let newData = {
        liveLink,
        ticketLink,
        stands: await getStands(db.current),
      };
      console.log(newData);
      setData(newData);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!app.current) {
      app.current = firebase.initializeApp(firebaseConfig);
      firebase.analytics();
      auth.current = firebase.auth();
      db.current = firebase.firestore();
      storage.current = firebase.storage();
    }
    setIsLoaded(true);
    getData();
  }, []);

  if (!isLoaded || !data)
    return (
      <div className="loader">
        {/* <div className="loader-wrapper">
          <img width="100px" src={logo} alt="Logo" />
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div> */}
        loading
      </div>
    );

  return (
    <div className="App">
      <UserContext.Provider value={{ userDetails, setUserDetails }}>
        <Router>
          {/* <Redirect noThrow={true} from="/" to="inicio" /> */}
          <MainView db={db.current} data={data} path="/*" />
          <Admin auth={auth.current} path="admin">
            <Stands db={db.current} storage={storage.current} path="/stands" />
            <GeneralSettings db={db.current} path="/" />
          </Admin>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
