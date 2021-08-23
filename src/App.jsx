import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import { Redirect, Router } from '@reach/router';
import Admin from './views/Admin/Admin';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import goodFX from './sounds/good.mp3';
import badFX from './sounds/bad.mp3';
import buttonFX from './sounds/button.mp3';
import interfaceFX from './sounds/interface.mp3';
import ambience from './sounds/space-ambience.mp3';

import firebaseConfig from './firebaseCred';
import MainView from './views/MainView';
import { getLinks, getStands } from './utils/dbRequests';
import Stands from './views/Admin/Stands';
import GeneralSettings from './views/Admin/GeneralSettings';
import Loader from './views/MainView/Loader';

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
  const [loadProg, setLoadProg] = useState(0);
  const [userDetails, setUserDetails] = useState({
    trivia: {},
    coins: 0,
    start: false,
    visited: {},
  });
  const [soundFX, setSoundFX] = useState();

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
      const { liveLink, ticketLink, brochureLink } =
        (await getLinks(db.current)) || {};
      setLoadProg(60);
      let newData = {
        liveLink,
        ticketLink,
        brochureLink,
        stands: await getStands(db.current),
      };
      setLoadProg(100);

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
    setLoadProg(30);

    loadSounds();
    setIsLoaded(true);
    getData();
  }, []);

  const loadSounds = () => {
    const sounds = {
      button: new Audio(buttonFX),
      bad: new Audio(badFX),
      good: new Audio(goodFX),
      interface: new Audio(interfaceFX),
      ambience: new Audio(ambience),
    };
    sounds.ambience.loop = true;
    sounds.ambience.volume = 0.3;
    setLoadProg(20);

    setSoundFX(sounds);
  };

  const playSound = (type) => {
    try {
      if (soundFX) {
        soundFX[type].play();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAmbience = () => {
    if (soundFX.ambience.duration > 0 && !soundFX.ambience.paused) {
      //Its playing...do your job
    } else {
      soundFX.ambience.play();
      //Not playing...maybe paused, stopped or never played.
    }
  };

  if (!isLoaded || !data || !soundFX || loadProg !== 100)
    return <Loader progress={loadProg} />;

  return (
    <div className="App">
      <UserContext.Provider value={{ userDetails, setUserDetails }}>
        <Router>
          {/* <Redirect noThrow={true} from="/" to="inicio" /> */}
          <MainView
            checkAmbience={checkAmbience}
            fx={playSound}
            db={db.current}
            data={data}
            path="/*"
          />
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
