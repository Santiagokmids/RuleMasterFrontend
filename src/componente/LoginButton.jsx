import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./css/LogButton.css";

function LoginButton(props) {
  const { h, w } = props;
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="logButton"
      onClick={() => loginWithRedirect()}
      style={{ width: w, height: h , backgroundColor: "#4786ff"}}
    >
      Log In
    </button>
  );
}

export default LoginButton;
