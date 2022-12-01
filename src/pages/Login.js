import React, { useState } from "react";
import { Card, Container, Form, Alert } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  return (
    <Container>
      <Card>
        <h2>Log in</h2>

        {/* Display alert if log in success */}
        {loginSuccess ? (
          <Alert key={"success"} variant={"success"}>
            Log in Succeed!
          </Alert>
        ) : (
          <Alert key={"warning"} variant={"warning"}>
            Log in Failed!
          </Alert>
        )}

        <Form>
          {/* Email input */}
          <Form.Group controlId="formLocalEmail">
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
          <Form.Group controlId="formLocalPassword">
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
      </Card>
    </Container>
  );
}

export default Login;
