import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditDoctorProfile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userData"));

  const [doctor, setDoctor] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    specialization: "",
    experience: "",
    fees: "",
  });

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "https://book-a-doctor-1-rwew.onrender.com/api/doctor/getDoctorInfo",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  const updateDoctorProfile = async () => {
  try {
    const res = await axios.post(
      "https://book-a-doctor-1-rwew.onrender.com/api/doctor/updateDoctorProfile",
      {
        ...doctor,
        userId: user._id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (res.data.success) {
      alert(res.data.message);
      navigate("/doctor-dashboard");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">

        <h3 className="text-center mb-4">
          Edit Doctor Profile
        </h3>

        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={doctor.fullName}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  fullName: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={doctor.email}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              value={doctor.phone}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  phone: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={doctor.address}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  address: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Specialization</Form.Label>
            <Form.Control
              value={doctor.specialization}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  specialization: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              value={doctor.experience}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  experience: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Consultation Fee</Form.Label>
            <Form.Control
              value={doctor.fees}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  fees: e.target.value,
                })
              }
            />
          </Form.Group>

          <Button
  variant="primary"
  onClick={updateDoctorProfile}
>
  Update Profile
</Button>


          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate("/doctor-dashboard")}
          >
            Cancel
          </Button>

        </Form>

      </Card>
    </Container>
  );
};

export default EditDoctorProfile;