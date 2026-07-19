import React, { useState } from "react";
import { Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css";


const Login = () => {

  const navigate = useNavigate();


  const [user, setUser] = useState({

    email: "",
    password: "",

  });



  const handleChange = (e) => {

    setUser({

      ...user,

      [e.target.name]: e.target.value,

    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      const res = await axios.post(

        "https://book-a-doctor-1-rwew.onrender.com/api/user/login",

        user

      );



      console.log("LOGIN RESPONSE:", res.data);



      if(res.data.success){


        localStorage.setItem(

          "token",

          res.data.token

        );



        localStorage.setItem(

          "userData",

          JSON.stringify(res.data.userData)

        );



        message.success("Login Successfully");



        const loggedInUser = res.data.userData;



        if(loggedInUser.type === "admin"){


          navigate("/adminHome");


        }

        else if(loggedInUser.type === "doctor"){


          navigate("/doctor-dashboard");


        }

        else{


          navigate("/userHome");


        }



      }

      else{


        message.error(res.data.message);


      }



    }

    catch(error){


      console.log(

        "LOGIN ERROR:",

        error.response?.data || error.message

      );



      message.error(

        error.response?.data?.message || "Something went wrong"

      );


    }


  };





  return (


    <div className="login-page">


      <div className="brand">


        <div className="brand-icon">

          🩺

        </div>


        <h2>
          Book A Doctor
        </h2>


      </div>





      <div className="login-card">


        <h1>
          Welcome Back
        </h1>



        <p className="subtitle">

          Access your medical appointment workspace

        </p>





        <form onSubmit={handleSubmit}>


          <div className="mb-4">


            <label>
              Email Address
            </label>



            <input

              type="email"

              name="email"

              value={user.email}

              onChange={handleChange}

              placeholder="Enter your email"

              className="form-control"

              required

            />


          </div>





          <div className="mb-4">


            <label>
              Password
            </label>



            <input

              type="password"

              name="password"

              value={user.password}

              onChange={handleChange}

              placeholder="Enter your password"

              className="form-control"

              required

            />


          </div>





          <Button

            htmlType="submit"

            className="login-btn"

          >

            Sign In


          </Button>






          <div className="register-link">


            Don't have an account?{" "}



            <Link to="/register">

              Create One

            </Link>



          </div>



        </form>




      </div>



    </div>


  );

};



export default Login;