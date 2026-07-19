import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { message } from "antd";
import AdminSidebar from "./AdminSidebar";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get(
        "https://book-a-doctor-1-rwew.onrender.com/api/admin/getAllDoctors"
      );

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch doctors");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const changeStatus = async (doctor, status) => {
    try {
      const url =
        status === "approved"
          ? "https://book-a-doctor-1-rwew.onrender.com/api/admin/getStatusApprove"
          : "https://book-a-doctor-1-rwew.onrender.com/api/admin/getStatusReject";

      const res = await axios.post(url, {
        doctorId: doctor._id,
        userId: doctor.userId,
        status,
      });

      if (res.data.success) {
        message.success(res.data.message);
        getDoctors();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8f9fa",
      }}
    >
      <AdminSidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <h2 className="text-center mb-4">
          Doctors Management
        </h2>

        <Table
  bordered
  hover
  responsive
  striped
  className="shadow bg-white"
>

          <thead
            style={{
              backgroundColor: "#0d6efd",
              color: "#fff",
            }}
          >
        <tr>
  <th className="bg-primary text-white">Name</th>
  <th className="bg-primary text-white">Email</th>
  <th className="bg-primary text-white">Specialization</th>
  <th className="bg-primary text-white">Experience</th>
  <th className="bg-primary text-white">Fees</th>
  <th className="bg-primary text-white">Action</th>
</tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
  <td>{doctor.fullName}</td>

  <td>{doctor.email}</td>

  <td>{doctor.specialization}</td>

  <td>
    {String(doctor.experience).includes("Year")
      ? doctor.experience
      : `${doctor.experience} Years`}
  </td>

  <td>₹{doctor.fees}</td>

  <td>
    {doctor.status === "pending" ? (
      <>
        <Button
          variant="success"
          size="sm"
          className="me-2"
          onClick={() => changeStatus(doctor, "approved")}
        >
          Approve
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={() => changeStatus(doctor, "rejected")}
        >
          Reject
        </Button>
      </>
    ) : (
      <strong>
        {doctor.status === "approved"
          ? "Approved"
          : "Rejected"}
      </strong>
    )}
  </td>
</tr>
            ))}
          </tbody>

        </Table>
      </div>
    </div>
  );
};

export default AdminDoctors;
