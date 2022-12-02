import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

export default function Register() {
  // Data send to API
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   Register success indicator
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // State for loading button
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (event) => {
    // prevent the form from refreshing the whole page
    event.preventDefault();

    // Loading Button
    setLoading(true);

    // set configurations
    const configuration = {
      method: "post",
      url: "https://nodejs-mongodb-auth-app-zeeger.herokuapp.com/register",
      data: {
        email,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // Register Success
        setRegisterSuccess(true);

        // Clear the error massage
        setErrorMsg("");

        // Cancel Loading Button
        setLoading(false);
      })
      .catch((error) => {
        // Where the error massage comes from in frontend console
        const err = error.response.data;

        // Set error massage
        setErrorMsg(err.message);

        // Cancel Loading Button
        setLoading(false);
      });
  };

  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={(event) => handleSubmit(event)}>
        {/* Register indicator */}
        {errorMsg && (
          <Alert key={"danger"} variant={"danger"}>
            {errorMsg}
          </Alert>
        )}
        {registerSuccess && (
          <Alert key={"success"} variant={"success"}>
            Login Success
          </Alert>
        )}

        {/* email input*/}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password input*/}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* Submit Button */}
        {!loading ? (
          <Button
            className="shadow-sm mx-auto w-50 mt-3"
            variant="primary"
            type="submit"
            onClick={(event) => {
              handleSubmit(event);
            }}>
            Login
          </Button>
        ) : (
          <Button className="shadow-sm mx-auto w-50 mt-3" variant="primary">
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"></span>
            <span> </span>
            Loading...
          </Button>
        )}
      </Form>
    </>
  );
}
