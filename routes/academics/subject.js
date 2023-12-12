const express = require("express");
const {  createSubject,
	getSubjects,
	getSubject,
	updateSubject,
	deleteSubject,

} = require("../../controller/academics/subjectCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const subjectRouter = express.Router();
 


subjectRouter.post("/:programID", isLogin, isAdmin, createSubject);
subjectRouter.get("/", isLogin, isAdmin, getSubjects );


subjectRouter
	.route("/:id")
	.get(  isLogin, isAdmin, getSubject )
	.put( isLogin, isAdmin, updateSubject  )
	.delete( isLogin, isAdmin, deleteSubject )

module.exports = subjectRouter;
