import "./signUp.scss";
// import {  useHistory } from "react-router-dom";
import React from "react";
import { useRef, useState } from "react";
import { Facebook, LinkedIn,Clear } from "@material-ui/icons";
import { Link } from "react-router-dom";
import loadinImg from "../adminDashboard/Loading_icon.gif";


export default function SignUn() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [showMasege, setShowMasege] = useState(false)
 

  const name = useRef();
  const password = useRef();
  const email = useRef();
  const confirmPassword = useRef();
  const server = `https://quiz-app-api-nine.vercel.app`;
  // const history = useHistory();

  async function handleSubmit() {
    // do validation
    if (password.current.value !== confirmPassword.current.value) {
      return setError("Passwords don't match!");
    }

    try {
      setError("");
      setLoading(true);

      fetch(`${server}/auth/register`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: name.current.value,
          email: email.current.value,
          password: password.current.value,
        }),
      })
        .then((data) => data.json())
        .then((data) => console.log(data));
          setLoading(false);
          setShowMasege(true)
          
      // history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create an account!");
    }
  }
  return (
    <>
    <div className="signUp">
      <div className="heading">SIGN UP</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="name"></label>
        <input required ref={name} type="text" name="name" id="name" />
        <label htmlFor="email">Email</label>

        <input required ref={email} type="email" name="email" id="email" />
        <label htmlFor="passwoed">Password</label>
        <input
          required
          ref={password}
          type="password"
          name="password"
          id="password"
        />
        <label htmlFor="cpasswoed">Confirm Password</label>
        <input
          required
          ref={confirmPassword}
          type="password"
          name="cpassword"
          id="cpassword"
        />
        <input
          className="submit"
          disabled={loading}
          type="submit"
          value="SIGN UP"
        />
      </form>

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
        Already a User <Link to={"/login"}>Login</Link>
      </div>
    </div>
    {showMasege && <div className="dalateMassege">
    <span>
      Sign up Successfull
    </span>
    <Clear className='claer' onClick={()=>setShowMasege(false)}/>
    
    </div>}
    {loading && (
    <div className="loading">
      <img src={loadinImg} alt="" />
    </div>
  )}</>
  );
}
