import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://book-a-doctor-1-rwew.onrender.com/api/user/register",
        user
      );

      if (res.data.success) {
        message.success("Registration Successful");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <Container className="register-container">
      <Card className="register-card">

        <h2 className="register-title">
          Create Account
        </h2>

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>

            <Form.Control
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Create password"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>

            <Form.Control
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="register-btn"
          >
            Register
          </Button>

          <div className="login-message">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </div>

        </Form>
      </Card>
    </Container>
  );
};

export default Register;