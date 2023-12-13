const express = require("express");

const { 
	adminRegisterStudent,
	loginStudent,
	getStudentProfile,
	getAllStudentsByAdmin,
	getStudentByAdmin,
	studentUpdateProfile,
	adminUpdateStudent,
	writeExam,
} = require("../../controller/academics/students/studentsCtrl");

const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");


const studentRouter = express.Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile",isStudentLogin, isStudent, getStudentProfile);
studentRouter.get("/admin", isLogin, isAdmin, getAllStudentsByAdmin);
studentRouter.get("/:studentID/admin",isLogin, isAdmin, getStudentByAdmin);
studentRouter.put("/update", isStudentLogin, isStudent, studentUpdateProfile);
studentRouter.put("/:studentID/update/admin",isLogin, isAdmin, adminUpdateStudent);
studentRouter.post("/exam/:examID/write", isStudentLogin, isStudent, writeExam);




module.exports = studentRouter;
