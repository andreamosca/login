import React, { useState, useEffect } from 'react';

import AuthContext from './storage/auth-context';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("login", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("login");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const loginInfo = localStorage.getItem("login"); 
    if(loginInfo === "1"){
      setIsLoggedIn(true);
    }
  },[/*app start*/])

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler
    }}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home/>}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
