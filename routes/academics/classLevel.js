const express = require("express");
const {  createClassLevel,
	getClassLevels,
	getClassLevel,
	updateClassLevel,
	deleteClassLevel,

} = require("../../controller/academics/classLevel");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const classLevelRouter = express.Router();
 


//academicYearRouter.post("/",isLogin, isAdmin, createAcademicYear);
//academicYearRouter.get("/",isLogin, isAdmin, getAcademicYears);

classLevelRouter
	.route("/")
	.post( isLogin, isAdmin, createClassLevel  )
	.get( isLogin, isAdmin, getClassLevels );

//academicYearRouter.get("/:id",isLogin, isAdmin, getAcademicYear);
//academicYearRouter.put("/:id",isLogin, isAdmin, updateAcademicYear);
//academicYearRouter.delete("/:id",isLogin, isAdmin, deleteAcademicYear);

classLevelRouter
	.route("/:id")
	.get(  isLogin, isAdmin, getClassLevel )
	.put( isLogin, isAdmin, updateClassLevel  )
	.delete( isLogin, isAdmin, deleteClassLevel )

module.exports = classLevelRouter;
