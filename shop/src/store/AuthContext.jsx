import { createContext, useState } from "react"

const AuthContext = createContext({
    loggedIn: true,
    login: () => {},
    logout: () => {}
  });

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("token") !== null ? true : false);

  const loginHandler = (token) => {
    setIsLoggedIn(true);
    sessionStorage.setItem("token", token);
  }

  const logoutHandler = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{
      loggedIn: isLoggedIn,
      login: loginHandler,
      logout: logoutHandler
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;