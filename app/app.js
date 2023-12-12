const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");
const academicYearRouter = require("../routes/academics/academicYear");
const academicTermRouter = require("../routes/academics/academicTerm");
const programRouter = require("../routes/academics/program");
const classLevelRouter = require("../routes/academics/classLevel");
const subjectRouter = require("../routes/academics/subject");
const yearGroupRouter = require("../routes/academics/yearGroup");
const teacherRouter = require("../routes/staff/teacherRouter");
const examRouter = require("../routes/academics/examRoute");
const {globalErrHandler, notFoundErr} = require("../middlewares/globalErrHandler");
const app = express();


app.use(morgan("dev"));
app.use(express.json())





app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/academic-years', academicYearRouter);
app.use('/api/v1/academic-terms', academicTermRouter);
app.use('/api/v1/class-level', classLevelRouter);
app.use('/api/v1/program', programRouter);
app.use('/api/v1/subject', subjectRouter);
app.use('/api/v1/year-group', yearGroupRouter);
app.use('/api/v1/teachers', teacherRouter);
app.use('/api/v1/exams', examRouter);


app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
