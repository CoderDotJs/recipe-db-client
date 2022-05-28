import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  Modal,
  ToggleButton,
} from "react-bootstrap";
import { errorToast, successToast } from "../../utils/toast";

const Index = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const radios = [
    { name: "Login", value: "1" },
    { name: "Signup", value: "2" },
  ];

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (radioValue === "1") {
        const res = await axios.post(
          `http://localhost:5000/api/auth/login`,
          data
        );
        localStorage.setItem("lab_token", res.data.token);
        successToast("Login Successful");
        window.location.reload();
        setShow(false);
      } else {
        const res = await axios.post(
          `http://localhost:5000/api/auth/register`,
          data
        );
        successToast(res.data.message);
        setRadioValue("1");
      }
    } catch (error) {
      if (error.response.status === 409) {
        errorToast("User already exists");
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Or Signup</Modal.Title>
        </Modal.Header>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-success" : "outline-danger"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <Modal.Body>
          <Form onSubmit={handleAuth}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <Form.Text className="text-muted">
                Well never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Index;
