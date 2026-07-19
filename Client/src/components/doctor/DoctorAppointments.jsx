import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button } from "react-bootstrap";
import axios from "axios";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userData"));

      const res = await axios.post(
        "https://book-a-doctor-1-rwew.onrender.com/api/doctor/getDoctorAppointments",
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
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (appointmentId, status) => {
  try {
    const res = await axios.post(
      "https://book-a-doctor-1-rwew.onrender.com/api/doctor/updateAppointmentStatus",
      {
        appointmentId,
        status,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (res.data.success) {
      alert(res.data.message);
      getAppointments();
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <h2 className="mb-4">Patient Appointment Requests</h2>

        <Table bordered hover>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.userInfo.fullName}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.status}</td>
                  <td>
                    <Button
                        variant="success"
                        size="sm"
                        className="me-2"
  onClick={() => {
    console.log("Accept clicked");
    updateStatus(appointment._id, "approved");
  }}
>
  Accept
</Button>

                    <Button
  variant="danger"
  size="sm"
  onClick={() =>
    updateStatus(appointment._id, "rejected")
  }
>
  Reject
</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No appointment requests available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default DoctorAppointments;