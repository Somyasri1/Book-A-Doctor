import React, { useEffect, useState } from "react";
import axios from "axios";

import CustomNavbar from "../common/Navbar";

import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";

import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSignOutAlt,
  FaUserMd,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import "./DoctorHome.css";


const DoctorDashboard = () => {

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  const [doctorInfo, setDoctorInfo] = useState(null);

  const user = JSON.parse(localStorage.getItem("userData"));


  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (a) => a.status === "pending"
  ).length;


  const approvedAppointments = appointments.filter(
    (a) => a.status === "approved"
  ).length;


  const rejectedAppointments = appointments.filter(
    (a) => a.status === "rejected"
  ).length;



  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    navigate("/login");

  };



  const getAppointments = async () => {

    try {

      const res = await axios.post(
        "https://book-a-doctor-1-rwew.onrender.com/api/doctor/getDoctorAppointments",
        {
          userId: user._id,
        },
        {
          headers:{
            Authorization:
            "Bearer " + localStorage.getItem("token"),
          }
        }
      );


      if(res.data.success){

        setAppointments(res.data.data);

      }


    } catch(error){

      console.log(error);

    }

  };

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
      setDoctorInfo(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};


  const updateStatus = async(id,status)=>{

    try{

      const res = await axios.post(
        "https://book-a-doctor-1-rwew.onrender.com/api/doctor/updateAppointmentStatus",
        {
          appointmentId:id,
          status
        },
        {
          headers:{
            Authorization:
            "Bearer " + localStorage.getItem("token")
          }
        }
      );


      if(res.data.success){

        alert(res.data.message);

        getAppointments();

      }


    }catch(error){

      console.log(error);

    }

  };


  useEffect(() => {
    getAppointments();
    getDoctorInfo();
  }, []);



return (
<>
  <CustomNavbar user={user} />

  <Container className="mt-4">

{/* Doctor Profile */}

<Card
  className="shadow-sm border-0 mb-4"
  style={{
    borderRadius: "15px",
    padding: "25px",
  }}
>

<Row className="align-items-center">

<Col md={2} className="text-center">

<FaUserMd
  size={80}
  color="#0d6efd"
/>

</Col>


<Col md={7}>

<h3
  style={{
    fontWeight: "700",
    color: "#0d6efd",
  }}
>
  Dr. {user?.fullName}
</h3>

<p
  className="text-muted"
  style={{
    fontSize: "17px",
    fontWeight: "500",
  }}
>
  {doctorInfo?.specialization}
</p>

<p>
  Experience: {doctorInfo?.experience} Years
</p>

<p>
  Consultation Fee: ₹{doctorInfo?.fees}
</p>

<p>
  Address: {doctorInfo?.address}
</p>

<p>
  Phone: {doctorInfo?.phone}
</p>

</Col>


<Col md={3} className="text-end">

  <Button
    variant="primary"
    className="me-2"
    onClick={() => navigate("/edit-doctor-profile")}
  >
    ✏️ Edit Profile
  </Button>

  <Button
    variant="outline-danger"
    onClick={handleLogout}
  >
    <FaSignOutAlt className="me-2" />
    Logout
  </Button>

</Col>


</Row>

</Card>




<h2 className="dashboard-title text-center">

Doctor Dashboard 👨‍⚕️

</h2>


<p className="text-center text-muted">

Manage your appointments efficiently.

</p>





<Row className="mb-4 mt-4">


<Col md={3}>

<Card className="stats-card bg-primary text-white shadow">

<FaCalendarCheck size={35}/>

<h5>
Total Appointments
</h5>

<h2>
{totalAppointments}
</h2>

</Card>

</Col>





<Col md={3}>

<Card className="stats-card bg-warning shadow">

<FaClock size={35}/>

<h5>
Pending
</h5>

<h2>
{pendingAppointments}
</h2>

</Card>

</Col>






<Col md={3}>

<Card className="stats-card bg-success text-white shadow">

<FaCheckCircle size={35}/>

<h5>
Approved
</h5>

<h2>
{approvedAppointments}
</h2>

</Card>

</Col>






<Col md={3}>

<Card className="stats-card bg-danger text-white shadow">

<FaTimesCircle size={35}/>

<h5>
Rejected
</h5>

<h2>
{rejectedAppointments}
</h2>

</Card>

</Col>


</Row>





<Card
  className="shadow-sm border-0"
  style={{
    borderRadius: "15px",
    padding: "25px",
  }}
>


<h4 className="mb-3">

Patient Appointment Requests

</h4>




<Table
  bordered
  hover
  responsive
  className="shadow-sm"
>

<thead>
  <tr>
    <th>Patient</th>
    <th>Date</th>
    <th>Action</th>
  </tr>
</thead>


<tbody>


{
appointments.length > 0 ?

appointments.map((appointment,index)=>(


<tr key={appointment._id || index}>


<td>
{appointment.userInfo.fullName}
</td>


<td>
{
new Date(
appointment.date
).toLocaleDateString()
}
</td>


<td>

{
appointment.status==="pending" ?

<>

<Button
size="sm"
variant="success"
className="me-2"
style={{ minWidth: "90px" }}

onClick={()=>updateStatus(
appointment._id,
"approved"
)}

>

Approve

</Button>



<Button
size="sm"
variant="danger"
style={{ minWidth: "90px" }}
onClick={()=>updateStatus(
appointment._id,
"rejected"
)}

>

Reject

</Button>


</>


:

<Button
  size="sm"
  disabled
  style={{
    backgroundColor:
      appointment.status === "approved"
        ? "#198754"
        : "#dc3545",
    borderColor:
      appointment.status === "approved"
        ? "#198754"
        : "#dc3545",
    color: "#fff",
    opacity: 1
  }}
>
  {appointment.status === "approved"
    ? "Approved"
    : "Rejected"}
</Button>

}


</td>



</tr>


))

:

<tr>

<td colSpan="3" className="text-center">

No Appointment Requests

</td>

</tr>

}



</tbody>


</Table>


</Card>


</Container>

</>

);

};


export default DoctorDashboard;