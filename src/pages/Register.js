import React, { useState } from "react";
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
        console.log(error);
        // Where the error massage comes from in frontend console
        const { errors } = error.response.data;
        const errorArrays = errors;

        // Set error massage
        setErrorMsg(errorArrays);

        // Cancel Loading Button
        setLoading(false);
      });
  };

  return (
    <Container className="pt-3">
      {/* Register indicator */}

      {/* Success display here*/}
      {registerSuccess && (
        <Alert className="w-75 mx-auto" variant={"success"}>
          Register Success
        </Alert>
      )}

      {/* Error display here */}
      {errorMsg &&
        //   Error massage was sent as arrays
        //  Get all the massage my map index method
        errorMsg.map((err, index) => (
          <Alert className="w-75 mx-auto" key={err.msg} variant={"danger"}>
            {err.msg}
          </Alert>
        ))}

      {/* Card which contain register form */}
      <Card className="boarder boarder-primary shadow rounded mx-auto p-3 w-50">
        <h2>Register</h2>
        <Form onSubmit={(event) => handleSubmit(event)}>
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
    </Container>
  );
}
