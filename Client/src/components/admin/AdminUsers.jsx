import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { message } from "antd";
import AdminSidebar from "./AdminSidebar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

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
      message.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
          Users Management
        </h2>

        <Table bordered hover responsive className="shadow bg-white">
          <thead>
  <tr>
    <th style={{ backgroundColor: "#0d6efd", color: "white" }}>Name</th>
    <th style={{ backgroundColor: "#0d6efd", color: "white" }}>Email</th>
    <th style={{ backgroundColor: "#0d6efd", color: "white" }}>Phone</th>
    <th style={{ backgroundColor: "#0d6efd", color: "white" }}>Type</th>
  </tr>
</thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {user.type}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;