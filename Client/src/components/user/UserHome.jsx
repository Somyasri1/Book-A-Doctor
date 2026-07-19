import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomNavbar from "../common/Navbar";


const UserHome = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userData"));

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [notifications, setNotifications] = useState([]);



  useEffect(() => {

    if (user?.isdoctor) {
      navigate("/doctor-dashboard");
    }

  }, [navigate, user]);



  const getDoctors = async () => {

    try {

      const res = await axios.get(
        "https://book-a-doctor-1-rwew.onrender.com/api/admin/getApprovedDoctors"
      );


      if(res.data.success){
        setDoctors(res.data.data);
      }


    } catch(error){

      console.log(error);

    }

  };



  const getNotifications = async()=>{

    try{

      const res = await axios.post(
        "https://book-a-doctor-1-rwew.onrender.com/api/user/getUserNotifications",
        {
          userId:user._id
        },
        {
          headers:{
            Authorization:
            `Bearer ${localStorage.getItem("token")}`
          }
        }
      );


      if(res.data.success){
        setNotifications(res.data.data);
      }


    }catch(error){

      console.log(error);

    }

  };




  useEffect(()=>{

    getDoctors();
    getNotifications();

  },[]);





  const filteredDoctors = doctors.filter((doctor)=>{


    const matchesSearch =
    doctor.fullName?.toLowerCase()
    .includes(search.toLowerCase())

    ||
    
    doctor.specialization?.toLowerCase()
    .includes(search.toLowerCase());



    const matchesLocation =
    location === "" ||
    doctor.address?.toLowerCase()
    .includes(location.toLowerCase());



    return matchesSearch && matchesLocation;


  });





return (

<>

<CustomNavbar user={user}/>


<div
style={{
background:"#f4f8ff",
minHeight:"100vh",
padding:"40px 0"
}}
>


<Container>



<h1
className="text-center mb-5"
style={{
color:"#1e3a8a",
fontWeight:"700"
}}
>
Welcome, {user?.fullName} 👋
</h1>





{/* NOTIFICATIONS */}

<Card
className="shadow-sm mb-5 border-0"
style={{
borderRadius:"18px"
}}
>


<Card.Body>


<div
className="d-flex justify-content-between align-items-center"
>


<h4
style={{
color:"#1e3a8a",
fontWeight:"700"
}}
>
🔔 Notifications
</h4>


<Button

variant="danger"

size="sm"

onClick={async()=>{


await axios.post(

"https://book-a-doctor-1-rwew.onrender.com/api/user/deleteallnotification",

{
userId:user._id
}

);


setNotifications([]);


}}

>
Clear All
</Button>


</div>



<hr/>


{

notifications.length>0 ?

notifications.map((notification,index)=>(

<p key={index}>
✅ {notification.message}
</p>

))

:

<p>
No notifications
</p>

}


</Card.Body>


</Card>







{/* DASHBOARD CARDS */}


<Row className="g-4 mb-5">



<Col md={4}>

<Card
className="shadow-sm border-0 text-center h-100"
style={{
borderRadius:"18px"
}}
>

<Card.Body>


<div
style={{
fontSize:"45px"
}}
>
🩺
</div>


<h4
style={{
color:"#2563eb"
}}
>
Apply as Doctor
</h4>


<p className="text-muted">
Submit your application to become a doctor.
</p>



<Button

style={{
background:"#2563eb",
border:"none"
}}

onClick={()=>navigate("/applyDoctor")}

>
Apply Now
</Button>


</Card.Body>

</Card>

</Col>





<Col md={4}>

<Card
className="shadow-sm border-0 text-center h-100"
style={{
borderRadius:"18px"
}}
>


<Card.Body>


<div style={{fontSize:"45px"}}>
📅
</div>


<h4
style={{
color:"#16a34a"
}}
>
My Appointments
</h4>


<p className="text-muted">
View all booked appointments.
</p>


<Button

variant="success"

onClick={()=>navigate("/appointments")}

>
View
</Button>


</Card.Body>


</Card>

</Col>






<Col md={4}>


<Card
className="shadow-sm border-0 text-center h-100"
style={{
borderRadius:"18px"
}}
>


<Card.Body>


<div style={{fontSize:"45px"}}>
🔔
</div>


<h4
style={{
color:"#f59e0b"
}}
>
Notifications
</h4>


<p className="text-muted">
Total Notifications
</p>


<h2
style={{
color:"#2563eb",
fontWeight:"700"
}}
>
{notifications.length}
</h2>


</Card.Body>


</Card>


</Col>


</Row>









<h2

className="text-center mb-3"

style={{
color:"#1e3a8a",
fontWeight:"700"
}}

>
Available Doctors
</h2>



<p className="text-center text-muted mb-4">

Choose a doctor and view profile before booking.

</p>





<Row className="mb-4">


<Col md={6}>

<input

className="form-control"

placeholder="🔍 Search by Name or Specialization"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</Col>



<Col md={6}>

<input

className="form-control"

placeholder="📍 Filter by Location"

value={location}

onChange={(e)=>setLocation(e.target.value)}

/>

</Col>


</Row>









<Row>


{

filteredDoctors.length>0 ?

filteredDoctors.map((doctor)=>(


<Col md={4}
className="mb-4"
key={doctor._id}
>


<Card

className="shadow-sm border-0 h-100"

style={{
borderRadius:"18px"
}}

>


<Card.Body>



<div

className="text-center"

style={{
fontSize:"55px"
}}

>
👨‍⚕️
</div>




<h4

className="text-center"

style={{
color:"#2563eb",
fontWeight:"700"
}}

>

Dr. {doctor.fullName}

</h4>


<hr/>

<p>
<strong>Specialization:</strong>
{" "}
{doctor.specialization}
</p>


<p>
<strong>Experience:</strong>
{" "}
{doctor.experience} Years
</p>


<p>
<strong>Consultation Fee:</strong>
{" "}
₹{doctor.fees}
</p>


<p>
<strong>Address:</strong>
{" "}
{doctor.address}
</p>




<Button

className="w-100"

style={{
background:"#2563eb",
border:"none"
}}

onClick={()=>navigate("/doctor-profile",
{
state:{
doctor
}
})}

>

View Profile

</Button>



</Card.Body>


</Card>



</Col>


))

:

<p className="text-center">
No doctors found.
</p>


}


</Row>





</Container>

</div>


</>

);

};


export default UserHome;