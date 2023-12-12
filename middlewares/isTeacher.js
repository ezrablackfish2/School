const verifyToken = require("../utils/verifyToken");
const Teacher = require("../model/Staff/Teacher");


const isTeacher = async (req, res, next) => {

	const userId = req?.userAuth?._id
	const teacherFound = await Teacher.findById(userId);
	
	if (teacherFound?.role === "teacher" ) {
		next();
	}
	else {
		next(new Error("Access Denied, teacher only"));
	}

}


module.exports = isTeacher;
