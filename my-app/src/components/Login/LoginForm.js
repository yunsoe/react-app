import React, { useState } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { useHistory } from "react-router-dom";
import { Form, Button, FormGroup } from "react-bootstrap";
import AuthContext from "../../navigation/AuthContext";
import { Dimensions } from 'react-native';

export default function LoginForm(props) {
  const history = useHistory();

  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
  });

  function createBasicAuthToken(email, password) {
    return 'Basic ' + window.btoa(email + ":" + password);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e, updateAuth) => {
    e.preventDefault();
    fetch(
      API_BASE_URL + "users/login/" + state.email + "/" + state.password,
      {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
      }
    ).then(function (response) {
        if (response.status === 200) {
          response.json().then(function(data) {
            setState((prevState) => ({
              ...prevState,
              successMessage: "Login successful. Redirecting to home page..",
            }));
            var token = createBasicAuthToken(state.email, state.password);
            updateAuth(true, state.email, Object.values(data.authorities[0])[0], token);
            redirectToHome();
          });
        } else if (response.status == 401) {
          alert("Wrong email or password");
        } else {
          alert("There was an error on our side, please try again later.");
        }
    });
  };

  const redirectToHome = () => {
    history.push("/home");
  };

  const redirectToRegister = () => {
    history.push("/register")
    props.setIsLoginForm(false);
  };

  const redirectToForgotPassword = () => {
    history.push("/forgotPassword")
    props.setIsLoginForm(false);
  };

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <div className="col-4 login-card mt-2 hv-center" style={{width: width * 0.5, height: height * 0.5, padding: width * 0.02, paddingTop: height * 0.05, paddingBottom: height * 0.05, backgroundColor: 'white', borderRadius: 10}}>
      <h3>Login</h3>
      <br />
      <AuthContext.Consumer>
        {({ updateAuth }) => (
          <Form onSubmit={(e) =>  handleSubmitClick(e, updateAuth)}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" value={state.email} onChange={handleChange} id="email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control required type="password" placeholder="Enter password" value={state.password} onChange={handleChange} id="password" />
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginBottom: 10}}>
              Login
            </Button>
            <Button variant="primary" type="button" onClick={() => redirectToForgotPassword()} style={{marginLeft: 10, marginBottom: 10}}>
              Forgot Password
            </Button>

            <div className="registerMessage">
              <div>Is your company not registered yet? Register here now.</div>
              <div style={{paddingBottom: 10}}/> 
              <Button className="btn btn-primary" onClick={() => redirectToRegister()}>Register</Button>
            </div>
          </Form>
        )}
      </AuthContext.Consumer>
    </div>
  );
}