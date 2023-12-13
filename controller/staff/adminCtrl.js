const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utils/generateToken"); 
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");


exports.registerAdminCtrl = AsyncHandler(
async (req, res) => {
	const { name, email, password } = req.body;

		const adminFound = await Admin.findOne({ email });
		if (adminFound) {
  			throw new Error('Admin Exists');
		}

		
		const user = await Admin.create({
			name,
			email,
			password: await hashPassword(password),

		})
		res.status(201).json({
			status: "success",
			data: user,
			message: "Admin registered successfully",
		});

}

)
exports.loginAdminCtrl = AsyncHandler(
async (req, res)=> {
	const { email, password } = req.body;

		const user = await Admin.findOne({  email  });
		if (!user) {
			return res.json({ message: 'User not found'})
		}

	const isMatched = await isPassMatched(password, user.password);

	if(!isMatched) {
		return res.json({ message: "Invalid credentials"})
	}
	else {
		return res.json({ 
				data: generateToken(user._id),
				message: "Admin loggedin succesfully",
			});
	}



}

)
exports.adminCtrl = AsyncHandler( 
async (req, res) => {
	const admins = await Admin.find();
	res.status(200).json({
		status: "success",
		message: "Admins fetched successfully",
		data: admins,
	})
}	
)

exports.getAdminProfileCtrl = AsyncHandler(async (req, res) => {
	const admin = await Admin.findById(req.userAuth._id).select("-password -createdAt -updatedAt -__v").populate("academicYears").populate("academicTerms").populate("programs").populate("yearGroups")
	.populate("classLevels").populate("teachers").populate("students");
	if (!admin) {
		throw new Error("Admin not found");
	}
	else {
		res.status(200).json({
			status: "success",
			data: admin,
			message: "Admin profile fetched successfully",
		})
	}
})

exports.updateAdminCtrl = AsyncHandler (
async (req, res)=> {
	const { email, name, password } = req.body;
	const emailExist = await Admin.findOne({ email });
	if (emailExist) {
		throw new Error("This email is taken/exist")
	}



	if (password) {

		const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
			email,
			password: await hashPassword(password),
			name,
		},
			{
				new: true,
				runValidators: true,
			}
	
		);
			res.status(200).json({
				status: "success",
				data: admin,
				message: "Admin updated successfully",
			})
	}
	else {
		const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
			email,
			name,
		},
			{
				new: true,
				runValidators: true,
			}
	
		);
			res.status(200).json({
				status: "success",
				data: admin,
				message: "Admin updated successfully",
			})
	}

}	
)


exports.deleteAdminCtrl =
	(req, res)=> {
	try {
		res.status(201).json(
			{
				status: "success",
				data: "delete admin"
			}
		);
	} catch (error) {
		res.json(
			{
				status: "failed",
				error: error.message
			}
		)
	}
}

exports.suspendAdminCtrl = 
	(req, res)=> {
	try {
		res.status(201).json(
			{
				status: "success",
				data: "admin suspend teacher"
			}
		);
	} catch (error) {
		res.json(
			{
				status: "failed",
				error: error.message
			}
		)
	}
}

exports.unsuspendAdminCtrl = 
	(req, res)=> {
	try {
		res.status(201).json(
			{
				status: "success",
				data: "admin unsuspend teacher"
			}
		);
	} catch (error) {
		res.json(
			{
				status: "failed",
				error: error.message
			}
		)
	}
}	


exports.withdrawAdminCtrl =
	(req, res)=> {
	try {
		res.status(201).json(
			{
				status: "success",
				data: "admin withdraw teacher"
			}
		);
	} catch (error) {
		res.json(
			{
				status: "failed",
				error: error.message
			}
		)
	}
}	

exports.unwithdrawAdminCtrl =
		(req, res)=> {
	try {
		res.status(201).json(
			{
				status: "success",
				data: "admin unwithdraw teacher"
			}
		);
	} catch (error) {
		res.json(
			{
				status: "failed",
				error: error.message
			}
		)
	}
}

exports.publishAdminCtrl = 
		(req, res)=> {
	try {
		res.status(201).json(
			{
				status: "success",
				data: "admin publish exam result"
			}
		);
	} catch (error) {
		res.json(
			{
				status: "failed",
				error: error.message
			}
		)
	}
}


exports.unpublishAdminCtrl =
(req, res)=> {
	try {
		res.status(201).json(
			{
				status: "success",
				data: "admin unpublish exam result"
			}
		);
	} catch (error) {
		res.json(
			{
				status: "failed",
				error: error.message
			}
		)
	}
}

