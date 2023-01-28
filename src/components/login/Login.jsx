import "./login.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, LinkedIn } from "@material-ui/icons";
import { useRef, useState,useEffect } from "react";
import {useData} from '../../context'
import { Clear } from "@material-ui/icons";
import loadinImg from "../adminDashboard/Loading_icon.gif";
// import { Navigate } from "react-router-dom";

export default function LogIn({}) {
  const {dispatch} = useData();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [loged, setloged] = useState(false);
    const [message, setMessage] = useState('')
  const [showMasege, setShowMasege] = useState(false)
  const server = `https://quiz-app-api-nine.vercel.app`;
  const [loginMessage, setLoginMessage] = useState(true);
  

  const email = useRef();
  const password = useRef();
  useEffect(() => {
    dispatch({
      type:'setActivePage',
      value:'login'
    })
  }, [])
  

  async function handleSubmit() {
    try {
      setError("");
      setLoading(true);
      // await login(email.current.value, password.current.value);
      fetch(`${server}/auth/login`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
      })
      .then((res)=>{
        if (res.status == 200) {
          dispatch({
            type: "setAdmin",
            value: true,
          });
          setMessage('Login Successfull.You are now an Admin')
          setLoading(false);
          setShowMasege(true);
          setloged(true)
          
          
        }
        else {
          setMessage('somthing went wrong')
          setLoading(false);
          setShowMasege(true)
        }
      })
        
        
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to login!");
    }
  }

  return (
    <>
    {/* {loged && <Navigate to ='/'/>} */}
    <div className="login">
      <div className="heading">LOGIN</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {loginMessage && 
       <div className='message'>
        <span>
        To check admin functionallity login with <br/>
        <b>email : dev.moshiurr@gmail.com </b><br/><b>
           password : 111</b>
        </span>
        <Clear onClick={()=>setLoginMessage(false)}/>
        </div>}
        <label htmlFor="email">Email</label>
        <input ref={email} type="email" name="email" id="email" />
        <label htmlFor="passwoed">Password</label>
        <input ref={password} type="password" name="password" id="password" />
        <div className="cheak">
          <input type="checkbox" name="checkbox" id="checkbox" />{" "}
          <span>Remind Me</span>
        </div>
        <input
          disabled={loading}
          className="submit"
          type="submit"
          value="LOGIN"
        />
      </form>
      <div className="forgot">Forgot Password?</div>
      <div className="or">
        <span>OR</span>
      </div>
      <div className="googleAndFacebook">
        <span>
          <Facebook />
        </span>
        <span>
          <LinkedIn />
        </span>
      </div>
      <div className="signLog">
        Need A Account
        <Link to="/signUp">Sign Up</Link>
      </div>
    </div>
    {showMasege && <div className="dalateMassege">
        <span>
          {message}
        </span>
        <Clear className='claer' onClick={()=>setShowMasege(false)}/>
        
        </div>}
        {loading && (
        <div className="loading">
          <img src={loadinImg} alt="" />
        </div>
      )}
    </>
    
  );
}
