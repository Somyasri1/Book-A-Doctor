import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Row, Col, Card } from "react-bootstrap";
import {
  FaUsers,
  FaUserMd,
  FaClock,
  FaCalendarCheck,
} from "react-icons/fa";
import { message } from "antd";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminHome = () => {
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState(0);

  // Get Doctors
  const getDoctors = async () => {
    try {
      const res = await axios.get(
        "https://book-a-doctor-1-rwew.onrender.com/api/admin/getAllDoctors"
      );

      if (res.data.success) {
        setDoctors(res.data.data);

        setPendingDoctors(
          res.data.data.filter(
            (doctor) => doctor.status === "pending"
          ).length
        );
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to load doctors");
    }
  };

  // Get Users
  const getUsers = async () => {
    try {
      const res = await axios.get(
        "https://book-a-doctor-1-rwew.onrender.com/api/admin/getAllUsers"
      );

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get Appointments
  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "https://book-a-doctor-1-rwew.onrender.com/api/admin/displayAllAppointments"
      );

      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to load appointments");
    }
  };

  useEffect(() => {
    getDoctors();
    getUsers();
    getAppointments();
  }, []);

  return (
  <div
    style={{
      display: "flex",
      minHeight: "100vh",
      background: "#f5f7fb",
    }}
  >
    <AdminSidebar />

    <div
      style={{
        flex: 1,
        padding: "30px",
      }}
    >
      <AdminHeader />

      {/* Dashboard Cards */}
      <Row className="g-4 mb-4">

  <Col lg={3} md={6}>
    <Card
      className="shadow-sm border-0"
      style={{ borderRadius: "12px" }}
    >
      <Card.Body
        className="d-flex justify-content-between align-items-center"
      >
        <div>
          <h6 className="text-muted">Total Users</h6>
          <h2>{users.length}</h2>
        </div>

        <FaUsers
          size={40}
          color="#0d6efd"
        />
      </Card.Body>
    </Card>
  </Col>

  <Col lg={3} md={6}>
    <Card
      className="shadow-sm border-0"
      style={{ borderRadius: "12px" }}
    >
      <Card.Body
        className="d-flex justify-content-between align-items-center"
      >
        <div>
          <h6 className="text-muted">Total Doctors</h6>
          <h2>{doctors.length}</h2>
        </div>

        <FaUserMd
          size={40}
          color="#198754"
        />
      </Card.Body>
    </Card>
  </Col>

  <Col lg={3} md={6}>
    <Card
      className="shadow-sm border-0"
      style={{ borderRadius: "12px" }}
    >
      <Card.Body
        className="d-flex justify-content-between align-items-center"
      >
        <div>
          <h6 className="text-muted">Pending Doctors</h6>
          <h2>{pendingDoctors}</h2>
        </div>

        <FaClock
          size={40}
          color="#ffc107"
        />
      </Card.Body>
    </Card>
  </Col>

  <Col lg={3} md={6}>
    <Card
      className="shadow-sm border-0"
      style={{ borderRadius: "12px" }}
    >
      <Card.Body
        className="d-flex justify-content-between align-items-center"
      >
        <div>
          <h6 className="text-muted">Appointments</h6>
          <h2>{appointments.length}</h2>
        </div>

        <FaCalendarCheck
          size={40}
          color="#dc3545"
        />
      </Card.Body>
    </Card>
  </Col>

</Row>

      {/* Appointment Table */}

      <div
        className="bg-white shadow-sm"
        style={{
          borderRadius: "12px",
          padding: "25px",
        }}
      >
        <h4
          style={{
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          All Appointments
        </h4>

        <Table
  hover
  bordered
  responsive
  className="align-middle"
>

          <thead>
  <tr
    style={{
      backgroundColor: "#0d6efd",
      color: "white",
      textAlign: "center",
    }}
  >
    <th
      style={{
        backgroundColor: "#0d6efd",
        color: "white",
      }}
    >
      Appointment ID
    </th>

    <th
      style={{
        backgroundColor: "#0d6efd",
        color: "white",
      }}
    >
      User
    </th>

    <th
      style={{
        backgroundColor: "#0d6efd",
        color: "white",
      }}
    >
      Doctor
    </th>

    <th
      style={{
        backgroundColor: "#0d6efd",
        color: "white",
      }}
    >
      Date
    </th>

    <th
      style={{
        backgroundColor: "#0d6efd",
        color: "white",
      }}
    >
      Status
    </th>
  </tr>
</thead>

          <tbody>
            {appointments.length > 0 ? (
              appointments.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.userInfo?.fullName}</td>
                  <td>{item.doctorInfo?.fullName}</td>
                  <td>{new Date(item.date).toLocaleString()}</td>

                  <td className="text-center">

  {item.status?.toLowerCase() === "approved" && (
    <span
      className="badge bg-success"
      style={{
        padding: "8px 15px",
        borderRadius: "20px",
        fontSize: "14px",
      }}
    >
      Approved
    </span>
  )}

  {item.status?.toLowerCase() === "pending" && (
    <span
      className="badge bg-warning text-dark"
      style={{
        padding: "8px 15px",
        borderRadius: "20px",
        fontSize: "14px",
      }}
    >
      Pending
    </span>
  )}

  {item.status?.toLowerCase() === "rejected" && (
    <span
      className="badge bg-danger"
      style={{
        padding: "8px 15px",
        borderRadius: "20px",
        fontSize: "14px",
      }}
    >
      Rejected
    </span>
  )}

  {item.status?.toLowerCase() === "cancelled" && (
  <span
    className="badge bg-secondary"
    style={{
      padding: "8px 15px",
      borderRadius: "20px",
      fontSize: "14px",
    }}
  >
    Cancelled
  </span>
)}

  {!item.status && (
    <span
      className="badge bg-secondary"
      style={{
        padding: "8px 15px",
        borderRadius: "20px",
        fontSize: "14px",
      }}
    >
      Pending
    </span>
  )}

</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No Appointments Found
                </td>
              </tr>
            )}
          </tbody>

        </Table>
      </div>

    </div>

  </div>
);

};

export default AdminHome;