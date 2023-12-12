const express = require("express");
const {  createYearGroup,
	getYearGroups,
	getYearGroup,
	updateYearGroup,
	deleteYearGroup,

} = require("../../controller/academics/yearGroupCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const yearGroupRouter = express.Router();
 

yearGroupRouter
	.route('/')
	.post(isLogin, isAdmin, createYearGroup)
	.get(isLogin, isAdmin, getYearGroups)



yearGroupRouter
	.route("/:id")
	.get(  isLogin, isAdmin, getYearGroup )
	.put( isLogin, isAdmin, updateYearGroup  )
	.delete( isLogin, isAdmin, deleteYearGroup )

module.exports = yearGroupRouter;
