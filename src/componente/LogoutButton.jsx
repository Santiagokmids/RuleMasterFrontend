import React from "react";
import "./css/LogButton.css";
import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton(props) {
  const { h, w } = props;
  const { logout } = useAuth0();
  return (
    <button
      className="logButton"
      onClick={() => logout()}
      style={{ width: w, height: h , backgroundColor: "#4786ff"}}
    >
      Log out
    </button>
  );
}

export default LogoutButton;
