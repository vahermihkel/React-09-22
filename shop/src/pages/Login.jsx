import { useContext } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4nmSr6PPc_pFGFBXw0ECMOi03xTHUMec";
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const login = () => {
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true
    }
    fetch(url, {method: "POST", body: JSON.stringify(user)})
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          setMessage(json.error.message);
        } else {
          navigate("/admin");
          authCtx.login(json.idToken);
        }
      })
    // authCtx.setLoggedIn(true);
  }

  return ( 
    <div>
      <div>{message}</div>
      <label>E-mail</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label> <br />
      <input ref={passwordRef} type="text" /> <br />
      <button onClick={login}>Logi sisse</button>
    </div> );
}

export default Login;