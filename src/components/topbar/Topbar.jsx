import React from "react";
import "./topbar.scss";
import { Home, Add, Input, ExitToApp, AccountBox } from "@material-ui/icons";
import {useData} from '../../context'
import { Link } from "react-router-dom";
export default function Topbar() {
  //const {currentUser,logout}=useAuth();
  const {data,dispatch} = useData();
  return (
    <div className="topbar">
        
        <Link to={"/"} 
          className={(data.activePage === 'home')? 'active' :''}>
          <Home />
          <span>
            Home
          </span>
          
        </Link>
      
        
        <Link to={"create"} 
          className={(data.activePage === 'create')? 'active' :''}>
        <Add />
          <span>
            Cteate
          </span>
        </Link>
        <Link to={"/login"} 
          className={(data.activePage === 'login')? 'active' :''}>
          <Input />
          <span>Login</span>
        </Link>
        
        <Link to={"/signUp"} 
          className={(data.activePage === 'signUp')? 'active' :''}>
          <ExitToApp />

          <span>
            Signup
          </span>
          
          </Link>
      
        
        <Link to={"/admin"} 
          className={(data.activePage === 'admin')? 'active' :''}>
          <AccountBox />
          <span>
            Admin
          </span>
          
          </Link>
      
    </div>
  );
}
