import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import Logo from "../assets/logo.jpg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = ({ user, setUser }) => {
  const history = useHistory();
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      // M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      // return;
      toast.error("invalid details")
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
         toast.error(data.error)
          // M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          // console.log(data.user);
          // M.toast({
          //   html: "signedin success",
          //   classes: "#43a047 green darken-1",
          // });
          toast.success("signin successful")
          history.push("/");
          setUser(data.user);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field"
      style={{backgroundColor:"#ebf5f0"}}>
      <img className="logo" src={Logo} alt="E-Book-Sale" />
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
        
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => PostData()}
        >
          Login
         
        </button>
        
        <h5>
          <Link to="/signup"><span>Dont have an account ?</span></Link>
        </h5>
      </div>
      <ToastContainer/>
    </div>
    
    
  );
};

export default SignIn;
