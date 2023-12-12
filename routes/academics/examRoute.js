const express = require("express");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const { createExam } = require("../../controller/academics/examsCtrl");

const examRouter = express.Router();



examRouter.route('/').post(isTeacherLogin, isTeacher, createExam);


module.exports = examRouter;


