const express = require("express");
const {  createAcademicTerm,
	getAcademicTerms,
	getAcademicTerm,
	updateAcademicTerm,
	deleteAcademicTerm,

} = require("../../controller/academics/academicTermCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const academicTermRouter = express.Router();
 


//academicYearRouter.post("/",isLogin, isAdmin, createAcademicYear);
//academicYearRouter.get("/",isLogin, isAdmin, getAcademicYears);

academicTermRouter
	.route("/")
	.post( isLogin, isAdmin, createAcademicTerm  )
	.get( isLogin, isAdmin, getAcademicTerms );

//academicYearRouter.get("/:id",isLogin, isAdmin, getAcademicYear);
//academicYearRouter.put("/:id",isLogin, isAdmin, updateAcademicYear);
//academicYearRouter.delete("/:id",isLogin, isAdmin, deleteAcademicYear);

academicTermRouter
	.route("/:id")
	.get(  isLogin, isAdmin, getAcademicTerm )
	.put( isLogin, isAdmin, updateAcademicTerm  )
	.delete( isLogin, isAdmin, deleteAcademicTerm )

module.exports = academicTermRouter;
