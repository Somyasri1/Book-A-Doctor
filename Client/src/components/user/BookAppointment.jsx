import React, { useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import CustomNavbar from "../common/Navbar";

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const doctor = location.state?.doctor;
  const user = JSON.parse(localStorage.getItem("userData"));

  const [date, setDate] = useState("");
const [time, setTime] = useState("");


  const handleBooking = async (e) => {
    e.preventDefault();

    if (!date) {
      message.error("Please select appointment date");
      return;
    }

    try {
      const res = await axios.post(
        "https://book-a-doctor-1-rwew.onrender.com/api/user/book-appointment",
        
        {
  doctorInfo: doctor,
  userInfo: user,
  date,
  time,
},
  
        
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        message.success("Appointment booked successfully");
        navigate("/appointments");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong while booking");
    }
  };

  if (!doctor) {
    return (
      <>
        <CustomNavbar user={user} />

        <Container className="mt-5">
          <Card className="shadow p-4 text-center">
            <h4>Doctor details not found</h4>

            <Button onClick={() => navigate("/userHome")}>
              Go Back
            </Button>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <CustomNavbar user={user} />

      <Container className="mt-5">
        <Card className="shadow p-4">
          <h3 className="text-center mb-4">
            Book Appointment
          </h3>

          <h5>Doctor Details</h5>

          <p>
            <strong>Name:</strong> {doctor.fullName}
          </p>

          <p>
            <strong>Specialization:</strong> {doctor.specialization}
          </p>

          <p>
            <strong>Experience:</strong> {doctor.experience}
          </p>

          <p>
  <strong>Fees:</strong> ₹{doctor.fees}
</p>

          
    <Form onSubmit={handleBooking}>

  <Form.Group className="mb-3">
    <Form.Label>
      Appointment Date
    </Form.Label>

    <Form.Control
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      required
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>
      Available Timings
    </Form.Label>

    <Form.Select
      value={time}
      onChange={(e) => setTime(e.target.value)}
      required
    >
      <option value="">Select Time</option>
      <option>09:00 AM</option>
      <option>10:00 AM</option>
      <option>11:00 AM</option>
      <option>12:00 PM</option>
      <option>02:00 PM</option>
      <option>03:00 PM</option>
      <option>04:00 PM</option>
      <option>05:00 PM</option>
    </Form.Select>
  </Form.Group>

  <Button
    type="submit"
    variant="success"
    className="px-4"
  >
    Confirm Appointment
  </Button>

</Form>
        </Card>
      </Container>
    </>
  );
};

export default BookAppointment;