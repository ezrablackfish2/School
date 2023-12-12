const AsyncHandler = require("express-async-handler");
const Teacher = require("../../model/Staff/Teacher");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");


exports.adminRegisterTeacher =  AsyncHandler(
async (req, res) => {
	const { name, email, password} = req.body;

	const teacher = await Teacher.findOne({ name });
	if (teacher) {
	throw new Error("Teacher already employed");
	}

	const hashedPassword = await hashPassword(password);

	const teacherCreated = await Teacher.create({
		name, 
		email, 
		password: hashedPassword,
	});

	res.status(201).json({
		status: "success",
		message: "Teacher registered successfully",
		data: teacherCreated,
	})

})


exports.loginTeacher = AsyncHandler(
	async(req, res) => {
		const { email, password } = req.body;

		const teacher = await Teacher.findOne({ email });
		if (!teacher) {
			return res.json({ message: "Invalid login credentials"});
		}
		const isMatched = await isPassMatched(password, teacher?.password);
		if (!isMatched) {
			return res.json({ message: "Invalid login credentials"});
		}

		else {
			res.status(200).json({
				status: "success",
				message: "Teacher logged in successfully",
				data: generateToken(teacher?._id),
			})
		}
	});


exports.getAllTeachersAdmin = AsyncHandler( 
	async (req, res) => {
		const teachers = await Teacher.find()
		res.status(200).json({
			status: "success",
			message: "Teachers fetched successfully",
			data: teachers,
		});
	})

exports.getTeacherByAdmin = AsyncHandler( 
	async (req, res) => {
		const teacherID = req.params.teacherID;
		const teacher = await Teacher.findById(teacherID);
		if (!teacher){
			throw new Error("Teacher not found .")
		}
		res.status(200).json({
			status: "success",
			message: "Teacher fetched successfully",
			data: teacher,
		});
	})



exports.getTeacherProfile = AsyncHandler( 
	async (req, res) => {
	
	const teacher = await Teacher.findById(req.userAuth?._id).select('-passwprd -createdAt -updatedAt')
		if (!teacher){
			throw new Error("teacher not found");
		}
		res.status(200).json({
			status: "success",
			data: teacher,
			message: "Teacher Profile fetched successfully",
		})
	});


exports.teacherUpdateProfile = AsyncHandler(
async (req, res) => {

	const { email, name, password } = req.body;

	const emailExist = await Teacher.findOne({ email });
	if(emailExist) {
		throw new Error("this email is taken/exist");
	}

	if (password) {
		const teacher = await Teacher.findByAndUpdate(
			req.userAuth._id,
			{
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
			data: teacher,
			message: "Teacher updated succesfully",
		});
	}
	else {
		const teacher = await Teacher.findByIdAndUpdate(
			req.userAuth._id,
			{
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
			data: teacher,
			message: "teacher updated successfully",
		});
	}
});



exports.adminUpdateTeacher = AsyncHandler (
async (req, res)=> {
	const { program, classLevel, academicYear, subject } = req.body;

	const teacherFound = await Teacher.findById(req.params.teacherID);
	if ( !teacherFound ) {
		throw new Error("Teacher not found")
	}


if (teacherFound.isWithdrawn){
		throw new Error("Action denied, teacher is withdrawn")
}


if (program) {
	teacherFound.program = program;
	await teacherFound.save();

			res.status(200).json({
				status: "success",
				data: teacherFound,
				message: "Teacher updated successfully",
			})


}

if (classLevel) {
	teacherFound.classLevel = classLevel;
	await teacherFound.save();

			res.status(200).json({
				status: "success",
				data: teacherFound,
				message: "Teacher updated successfully",
			})

}

if (academicYear) {
	teacherFound.academicYear = academicYear;
	await teacherFound.save();

			res.status(200).json({
				status: "success",
				data: teacherFound,
				message: "Teacher updated successfully",
			})

}

if (subject) {
	teacherFound.subject = subject;
	await tecaherFound.save();

			res.status(200).json({
				status: "success",
				data: teacherFound,
				message: "Teacher updated successfully",
			})

}



}	
)










