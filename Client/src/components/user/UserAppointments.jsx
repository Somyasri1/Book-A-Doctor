import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Table,
  Badge,
  Button,
} from "react-bootstrap";
import CustomNavbar from "../common/Navbar";

const UserAppointments = ({ userId }) => {
  const user = JSON.parse(localStorage.getItem("userData"));

  console.log("USER DATA:", user);
console.log("USER ID:", userId);

  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.post(
        "https://book-a-doctor-1-rwew.onrender.com/api/user/getUserAppointments",
        { userId },
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("FULL RESPONSE:", res);
console.log("RESPONSE DATA:", JSON.stringify(res.data, null, 2));

      if (res.data.success) {

        console.log(
  JSON.stringify(res.data.data, null, 2)
);

        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAppointment = async (appointmentId) => {

  console.log("CANCEL APPOINTMENT ID:", appointmentId);
  try {

    const res = await axios.post(
  "https://book-a-doctor-1-rwew.onrender.com/api/user/cancelAppointment",
  {
    appointmentId,
  },
  {
    headers: {
      Authorization:
        "Bearer " + localStorage.getItem("token"),
    },
  }
);

    if (res.data.success) {
      alert("Appointment cancelled successfully");

      getAppointments();
    }

  } catch (error) {

    console.log(error);

    alert("Error cancelling appointment");

  }
};

  useEffect(() => {
  if (userId) {
    getAppointments();
  }
}, [userId]);

  return (
    <>
      <CustomNavbar user={user} />

      <Container className="mt-4">

        <h2
          className="text-center"
          style={{
            color: "#0d6efd",
            fontWeight: "700",
          }}
        >
          My Appointments
        </h2>

        <p className="text-center text-muted mb-4">
          View all your booked appointments.
        </p>

        <Card
          className="shadow-sm border-0"
          style={{
            borderRadius: "15px",
          }}
        >
          <Card.Body>

            <Table
              bordered
              hover
              responsive
              className="align-middle text-center"
            >
              <thead className="table-primary">
                <tr>
                  <th>Doctor Name</th>
                  <th>Appointment Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {appointments.length > 0 ? (

                  appointments.map((appointment) => (

                    <tr key={appointment._id}>

  <td>
    Dr. {appointment.doctorInfo?.fullName}
  </td>

  <td>
    {new Date(
      appointment.date
    ).toLocaleDateString()}
  </td>


  {/* Status Column */}
  <td>

    {appointment.status?.toLowerCase() === "pending" && (
      <Badge
        bg="warning"
        text="dark"
        pill
      >
        Pending
      </Badge>
    )}

    {appointment.status?.toLowerCase() === "approved" && (
      <Badge
        bg="success"
        pill
      >
        Approved
      </Badge>
    )}

    {appointment.status?.toLowerCase() === "rejected" && (
      <Badge
        bg="danger"
        pill
      >
        Rejected
      </Badge>
    )}

    {appointment.status?.toLowerCase() === "cancelled" && (
      <Badge
        bg="secondary"
        pill
      >
        Cancelled
      </Badge>
    )}

  </td>


  {/* Action Column */}
  <td>

    {appointment.status?.toLowerCase() === "pending" && (
      <Button
        variant="danger"
        size="sm"
        onClick={() => cancelAppointment(appointment._id)}
      >
        Cancel
      </Button>
    )}
            </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td
                      colSpan="3"
                      className="text-center"
                    >
                      No Appointments Found
                    </td>
                  </tr>

                )}

              </tbody>

            </Table>

          </Card.Body>
        </Card>

      </Container>
    </>
  );
};

export default UserAppointments;