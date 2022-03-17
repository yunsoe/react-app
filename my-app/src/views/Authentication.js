import React, { useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import RegistrationForm from "../components/Registration/RegistrationForm";
import "./View.css";

export default function Authentication() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
  <div >
    
    <div id = 'login'
      style={{
        // backgroundColor: "red",
        height: "100vh",
        display: "flex",
        // alignItems: "center",
        paddingTop: "150px",
        paddingBottom: "325px",
        justifyContent: "center",
      }}
    >
    <h1> 
    Many Industries, <br></br>One Singapore,<br></br>One Website
    </h1>
    <div id = 'loginwords'>
        <p>Join over 90% of industries
        <br></br>
        in Singapore in stopping the spread
        <br></br>
        of COVID-19 through keeping up
        <br></br>
        with regulations and news</p>
    </div>
      {isLoginForm ? (
        <LoginForm setIsLoginForm={setIsLoginForm} />
      ) : (
        <RegistrationForm setIsLoginForm={setIsLoginForm} />
      )}
    </div>
    </div>
  );
}