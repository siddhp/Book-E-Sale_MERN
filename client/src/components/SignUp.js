import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import Logo from "../assets/logo.jpg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");

  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      // M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
     toast.error("invalide details")
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          toast.error(data.error)
        } else {
          // M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          toast.success(data.message)
          history.push("/signin");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <div className="mycard" >
      <div className="card auth-card input-field" style={{backgroundColor:"#ebf5f0"}}>
        <img className="logo" src={Logo} alt="E-Book-Sale" />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPasword(e.target.value)}
        />
        <button 
          style={{backgroundColor:"#1ee88d",borderRadius:"10px",padding:"10px",
          width:"200px",color:"red",fontSize:"20px",fontWeight:"bold"}}
          // className="btn waves-effect waves-light #64b5f6 blue darken-1"
           onClick={() => uploadFields()}
        >
          SignUP
          <ToastContainer/>
        </button>
        <h5 >
          <Link to="/signin"><span style={{color:"blue",textDecoration:"none"}}>Already have an account ?</span></Link>
        </h5>
      </div>
    </div>
  );
};

export default SignUp;
