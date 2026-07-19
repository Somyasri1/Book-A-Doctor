import React, { useEffect, useState } from "react";
import { Tabs, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "./Navbar";

const Notification = () => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const getUser = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      setUser(userData);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleAllMarkRead = async () => {
    try {
      const res = await axios.post(
        "https://book-a-doctor-1-rwew.onrender.com/api/user/getallnotification",
        { userId: user._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        const updatedUser = {
          ...user,
          notification: [],
          seennotification: [
            ...user.seennotification,
            ...user.notification,
          ],
        };

        localStorage.setItem(
          "userData",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const handleDeleteAllMark = async () => {
    try {
      const res = await axios.post(
        "https://book-a-doctor-1-rwew.onrender.com/api/user/deleteallnotification",
        { userId: user._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        const updatedUser = {
          ...user,
          notification: [],
          seennotification: [],
        };

        localStorage.setItem(
          "userData",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
  <>
    <CustomNavbar user={user} />

    <div className="p-3">
      <Tabs
        items={[
          {
            key: "1",
            label: "Unread",
            children: (
              <div>
                <div className="text-end mb-3">
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={handleAllMarkRead}
                  >
                    Mark All as Read
                  </span>
                </div>

                {user?.notification?.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded mb-2 d-flex justify-content-between align-items-center"
                  >
                    <span>{item.message}</span>
                  </div>
                ))}
              </div>
            ),
          },
          {
            key: "2",
            label: "Seen",
            children: (
              <div>
                <div className="text-end mb-3">
                  <span
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={handleDeleteAllMark}
                  >
                    Delete All
                  </span>
                </div>

                {user?.seennotification?.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded mb-2 d-flex justify-content-between align-items-center"
                  >
                    <span>{item.message}</span>
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      />
      </div>
    </>
  );
};

export default Notification;