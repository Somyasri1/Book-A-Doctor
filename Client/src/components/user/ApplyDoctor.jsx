import React, { useState } from "react";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { Container } from "react-bootstrap";
import axios from "axios";
import CustomNavbar from "../common/Navbar";

const ApplyDoctor = () => {

  // Get logged in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));

  const [doctor, setDoctor] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    specialization: "",
    experience: "",
    fees: "",
    timings: "",
  });

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimingChange = (_, timeString) => {
    setDoctor({
      ...doctor,
      timings: timeString,
    });
  };

  const handleSubmit = async () => {

    try {

      const res = await axios.post(

        "https://book-a-doctor-1-rwew.onrender.com/api/doctor/applyDoctor",

        {
          ...doctor,

          // Send logged in user's id
          userId: loggedInUser._id,

        },

        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token"),
          },
        }

      );

      console.log("RESPONSE:", res.data);

      if (res.data.success) {

        message.success(res.data.message);

      } else {

        message.error(res.data.message);

      }

    } catch (error) {

      console.log(
        "APPLY DOCTOR ERROR:",
        error.response?.data || error.message
      );

      message.error(
        error.response?.data?.message ||
          "Something went wrong"
      );

    }

  };

  return (
  <>
    <CustomNavbar user={loggedInUser} />

    <Container className="mt-4">

      <h2
  className="text-center"
  style={{
    color: "#0d6efd",
    fontWeight: "700",
  }}
>
  Doctor Application
</h2>

<p className="text-center text-muted mb-4">
  Fill in your professional details to apply as a doctor.
</p>

      <div
  className="mx-auto"
  style={{
    maxWidth: "900px",
  }}
>
  <div
    className="shadow-sm bg-white p-4"
    style={{
      borderRadius: "15px",
    }}
  >
    <Form
      layout="vertical"
      onFinish={handleSubmit}
    >

        <Row gutter={20}>

          <Col span={12}>

            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please enter your full name",
                },
              ]}
            >

              
            <Input
  name="fullName"
  value={doctor.fullName}
  onChange={handleChange}
  size="large"
/>

            </Form.Item>

          </Col>

          <Col span={12}>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter email",
                },
              ]}
            >

              <Input
                name="email"
                value={doctor.email}
                onChange={handleChange}
              />

            </Form.Item>

          </Col>

        </Row>

        <Row gutter={20}>

          <Col span={12}>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter phone",
                },
              ]}
            >

              <Input
                name="phone"
                value={doctor.phone}
                onChange={handleChange}
              />

            </Form.Item>

          </Col>

          <Col span={12}>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please enter address",
                },
              ]}
            >

              <Input
                name="address"
                value={doctor.address}
                onChange={handleChange}
              />

            </Form.Item>

          </Col>

        </Row>

        <Row gutter={20}>

          <Col span={12}>

            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[
                {
                  required: true,
                  message: "Please enter specialization",
                },
              ]}
            >

              <Input
                name="specialization"
                value={doctor.specialization}
                onChange={handleChange}
              />

            </Form.Item>

          </Col>

          <Col span={12}>

            <Form.Item
              label="Experience"
              name="experience"
              rules={[
                {
                  required: true,
                  message: "Please enter experience",
                },
              ]}
            >

              <Input
                name="experience"
                value={doctor.experience}
                onChange={handleChange}
              />

            </Form.Item>

          </Col>

        </Row>

        <Row gutter={20}>

          <Col span={12}>

            <Form.Item
              label="Consultation Fees"
              name="fees"
              rules={[
                {
                  required: true,
                  message: "Please enter fees",
                },
              ]}
            >

              <Input
                name="fees"
                value={doctor.fees}
                onChange={handleChange}
              />

            </Form.Item>

          </Col>

          <Col span={12}>

            <Form.Item
              label="Available Timings"
              name="timings"
              rules={[
                {
                  required: true,
                  message: "Please select timings",
                },
              ]}
            >

              
              <TimePicker
  use12Hours
  format="h:mm A"
  size="large"
  onChange={handleTimingChange}
  style={{ width: "100%" }}
/>

            </Form.Item>

          </Col>

        </Row>

        <Row>

          <Col span={24} className="text-center">

            <Form.Item>

              <button
  type="submit"
  className="btn btn-primary btn-lg px-5"
  style={{
    borderRadius: "10px",
  }}
>
  Submit Application
</button>

            </Form.Item>

          </Col>

        </Row>

          </Form>
  </div>
</div>

</Container>
    </>
  );

};

export default ApplyDoctor;