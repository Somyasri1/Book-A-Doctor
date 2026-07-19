const express = require("express");

const {
  getAllUsersController,
  getAllDoctorsController,
  getApprovedDoctorsController,
  getStatusApproveController,
  getStatusRejectController,
  displayAllAppointmentController,
  getDashboardStatsController,
} = require("../controllers/AdminController");

const router = express.Router();

// Users
router.get("/getAllUsers", getAllUsersController);

// Doctors
router.get("/getAllDoctors", getAllDoctorsController);
router.get("/getApprovedDoctors", getApprovedDoctorsController);

// Approve / Reject Doctor
router.post("/getStatusApprove", getStatusApproveController);
router.post("/getStatusReject", getStatusRejectController);

// Appointments
router.get(
  "/displayAllAppointments",
  displayAllAppointmentController
);

// Dashboard Statistics
router.get(
  "/dashboard-stats",
  getDashboardStatsController
);

module.exports = router;
