const verifyToken = require("../utils/verifyToken");
const Teacher = require("../model/Staff/Teacher");

const isTeacherLogin = async (req, res, next) => {

	const headerObj = req.headers;
	const token = headerObj?.authorization?.split(" ")[1];
	const verifiedToken = verifyToken(token);
	if (verifiedToken) {
		const user = await Teacher.findById(verifiedToken.id)
			.select('name email role');
		req.userAuth = user;
		next();
	}
	else {
		const err = new Error("Token Expired or Invalid");
		next(err);
	}

}


module.exports = isTeacherLogin;
