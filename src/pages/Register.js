import React, { useState, useEffect, useRef } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const { KEYS } = require("../KEYS");

export default function Register() {
  // Data send to API
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   Register success indicator
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // State for loading button
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  // Set focus to email input input box
  const emailRef = useRef();
  useEffect(() => {
    emailRef.current.focus();
    return () => {
      return;
    };
  }, []);

  const handleSubmit = (event) => {
    // prevent the form from refreshing the whole page
    event.preventDefault();

    // Loading Button
    setLoading(true);

    // set configurations
    const configuration = {
      method: "post",
      url: `${KEYS.SERVER_URL}/auth/register`,
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
        const { errors } = error.response.data;
        const errorArrays = errors;

        // Set error massage
        setErrorMsg(errorArrays);

        // Register display clear
        setRegisterSuccess(false);

        // Cancel Loading Button
        setLoading(false);
      });
  };

  return (
    <Container className="pt-3">
      {/* Card which contain register form */}
      <Card className="boarder boarder-primary shadow rounded mb-3 mx-auto p-3 w-75">
        <h2>Register</h2>

        {/* Success display here*/}
        {registerSuccess && (
          <Alert className="w-100" variant={"success"}>
            Register Success
          </Alert>
        )}

        <Form onSubmit={(event) => handleSubmit(event)}>
          {/* email input*/}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              ref={emailRef}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>

          {/* password input*/}
          <Form.Group className="mt-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
          </Form.Group>
        </Form>

        {/* Submit Button */}
        {!loading ? (
          <Button
            className="shadow-sm mx-auto w-50 mt-3"
            variant="primary"
            type="submit"
            onClick={(event) => {
              handleSubmit(event);
            }}>
            Register
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
      </Card>

      {/* Error display here */}
      {errorMsg &&
        //   Error massage was sent as arrays
        //  Get all the massage my map index method
        errorMsg.map((err, index) => (
          <Alert className="w-100 mx-auto" key={err.msg} variant={"danger"}>
            {err.msg}
          </Alert>
        ))}
    </Container>
  );
}
