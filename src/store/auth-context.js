import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('idToken'))
  }, []);
  const userLoggedIn = !!token;
  const loginHandler = (token) => {
    //console.log(token)
    setToken(token);
    localStorage.setItem("idToken", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('idToken')
  };

  const authContext = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {/* {console.log(token)} */}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
