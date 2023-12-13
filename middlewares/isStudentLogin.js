const verifyToken = require("../utils/verifyToken");
const Student = require("../model/Academic/Student");

const isStudentLogin = async (req, res, next) => {

	const headerObj = req.headers;
	const token = headerObj?.authorization?.split(" ")[1];
	const verifiedToken = verifyToken(token);
	if (verifiedToken) {
		const user = await Student.findById(verifiedToken.id)
			.select('name email role');
		req.userAuth = user;
		next();
	}
	else {
		const err = new Error("Token Expired or Invalid");
		next(err);
	}

}


module.exports = isStudentLogin;
