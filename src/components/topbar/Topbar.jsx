import React from "react";
import "./topbar.scss";
import { Home, Add, Input, ExitToApp, AccountBox } from "@material-ui/icons";

import { Link } from "react-router-dom";
export default function Topbar() {
  //const {currentUser,logout}=useAuth();
  return (
    <div className="topbar">
      <div>
        <Home />
        <Link to={"/"}>Home</Link>
      </div>
      <div>
        <Add />
        <Link to={"create"}>Create</Link>
      </div>
      <div>
        <Input />
        <Link to={"/login"}>Login</Link>
      </div>
      <div>
        <ExitToApp />
        <Link to={"/signUp"}>Signup</Link>
      </div>
      <div>
        <AccountBox />
        <Link to={"/admin"}>Admin</Link>
      </div>
    </div>
  );
}
