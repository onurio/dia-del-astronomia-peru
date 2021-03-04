import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import { Redirect, Router } from '@reach/router';
import Admin from './views/Admin/Admin';
// import firebase from 'firebase';
// import firebaseConfig from './firebaseCred';
// import GeneralSettings from './views/Admin/GeneralSettings';
// import Artists from './views/Admin/Artists';
// import ArtistArtworks from './views/Admin/ArtistArtworks';
import MainView from './views/MainView';
import {} from './utils/dbRequests';

function App() {
  const auth = useRef();
  const db = useRef();
  const storage = useRef();
  const app = useRef();
  const [isLoaded, setIsLoaded] = useState(true);
  const [data, setData] = useState({});

  const getData = async () => {
    // try {
    //   let newData = {
    //     openingHours: await getHours(db.current),
    //     categories: await getCategories(db.current),
    //     expos: await getExpos(db.current),
    //     artists: await getArtists(db.current),
    //   };
    //   setData(newData);
    //   setIsLoaded(true);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    // if (!app.current) {
    //   app.current = firebase.initializeApp(firebaseConfig);
    //   firebase.analytics();
    //   auth.current = firebase.auth();
    //   db.current = firebase.firestore();
    //   storage.current = firebase.storage();
    // }
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
      <Router>
        {/* <Redirect noThrow={true} from="/" to="inicio" /> */}
        <MainView db={db.current} data={data} path="/*" />
        <Admin auth={auth.current} path="admin">
          <div>asdf</div>
        </Admin>
      </Router>
    </div>
  );
}

export default App;
