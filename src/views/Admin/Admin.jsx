import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Dashboard from './Dashboard';
export default function Admin({ auth, children }) {
  const [isAuthenticaited, setIsAuthenticaited] = useState(false);

  const logout = () => {
    auth
      .signOut()
      .then(function () {
        // Sign-out successful.
        setIsAuthenticaited(false);
      })
      .catch(function (error) {
        // An error happened.
        alert(error);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        if (user.email === 'omrinuri@gmail.com') {
          setIsAuthenticaited(true);
        } else {
          setIsAuthenticaited(false);
        }
        // User is signed in.
      } else {
        // No user is signed in.
        setIsAuthenticaited(false);
      }
    });
  }, [auth]);

  const login = () => {
    if (isAuthenticaited) return;
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        if (
          user.email === 'omrinuri@gmail.com' ||
          user.email === 'astrospace.app@gmail.com'
        ) {
          setIsAuthenticaited(true);
        } else {
          alert('Your google account is unauthorized to use this page.');
          setIsAuthenticaited(false);
        }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        alert(error.message);
      });
  };

  if (isAuthenticaited) {
    return (
      <Dashboard path="/" logout={logout}>
        {children}
      </Dashboard>
    );
  } else {
    return (
      <div>
        <h1>You must log be an admin to view this page</h1>
        <button onClick={login}>Login using google</button>
      </div>
    );
  }
}
