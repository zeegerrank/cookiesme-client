import React, { useState } from "react";import axios from "axios";
import { Card, Container, Form, Alert, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = (event) => {
    // Prevent page from refreshing after submit
    event.preventDefault();

    // Set axios configuration
    const configuration = {
      method: "post",
      url: "https://cookiesme-server.onrender.com/auth/login",
      data: { email, password },
    };

    // Call API Login endpoint
    axios(configuration)
      .then((result) => {
        // Login Success
        setLoginSuccess(true);

        // Set Cookie
        cookies.set("TOKEN", result.data.token, { path: "/" });

        // Redirect User to Home page
        window.location.href = "/";
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <Container>
      <Card className="boarder boarder-primary shadow rounded mt-5 mx-auto p-3 w-25">
        <h2 className="mb-3">Log in</h2>

        {/* Display alert if log in success */}
        {loginSuccess ? (
          <Alert key={"success"} variant={"success"}>
            Log in Succeed!
          </Alert>
        ) : (
          <Alert key={"danger"} variant={"danger"}>
            Log in Failed!
          </Alert>
        )}

        <Form>
          {/* Email input */}
          <Form.Group className="shadow-sm " controlId="formLocalEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          {/* Password Input */}
          <Form.Group className="shadow-sm mt-2" controlId="formLocalPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
        </Form>
        <Button
          className="shadow-sm mx-auto w-50 mt-3"
          variant="primary"
          type="submit"
          onClick={(event) => {
            handleSubmit(event);
          }}>
          Login
        </Button>
      </Card>
    </Container>
  );
}

export default Login;
