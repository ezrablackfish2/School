const AsyncHandler = require("express-async-handler");
const Student = require("../../../model/Academic/Student");
const { hashPassword, isPassMatched } = require("../../../utils/helpers");
const generateToken = require("../../../utils/generateToken");
const Exam = require("../../../model/Academic/Exam");
const ExamResult = require("../../../model/Academic/ExamResults");
const Admin = require("../../../model/Staff/Admin");


exports.adminRegisterStudent =  AsyncHandler(
async (req, res) => {
	const { name, email, password} = req.body;

	const adminFound = await Admin.findById(req.userAuth._id);
	if (!adminFound) {
		throw new Error("Admin not found");
	}

	const student = await Student.findOne({ email });
	if (student) {
	throw new Error("Student already employed");
	}

	const hashedPassword = await hashPassword(password);

	const studentRegistered = await Student.create({
		name, 
		email, 
		password: hashedPassword,
	});

	adminFound.students.push(studentRegistered)
	await adminFound.save();



	res.status(201).json({
		status: "success",
		message: "Student registered successfully",
		data: studentRegistered,
	})

})



exports.loginStudent = AsyncHandler(
	async(req, res) => {
		const { email, password } = req.body;

		const student = await Student.findOne({ email });
		if (!student) {
			return res.json({ message: "Invalid login credentials"});
		}
		const isMatched = await isPassMatched(password, student?.password);
		if (!isMatched) {
			return res.json({ message: "Invalid login credentials"});
		}

		else {
			res.status(200).json({
				status: "success",
				message: "Student logged in successfully",
				data: generateToken(student?._id),
			})
		}
	});


exports.getStudentProfile = AsyncHandler( 
	async (req, res) => {
	
	const student = await Student.findById(req.userAuth?._id)
			.select('-passwprd -createdAt -updatedAt')
			.populate("examResults")
		if (!student){
			throw new Error("student not found");
		}


		const studentProfile = {
		name: student?.name,
		email: student?.email,
		currentClassLevel: student?.currentClassicLevel,
		program: student?.program,
		dateAdmitted: student?.dateAdmitted,
		isSuspended: student?.isSuspended,
		isWithdrawn: student?.isWithdrawn,
		studentId: student?.studentId,
		prefectName: student?.prefectName,
	};



	const examResults = student?.examResults;	

	const currentExamResult = examResults[examResults.length - 1];

	const isPublished = currentExamResult?.isPublished;

	console.log(currentExamResult);


		res.status(200).json({
			status: "success",
			data: {
				studentProfile,
				currentExamResult: isPublished ? currentExamResult : [],
			},
			message: "Student Profile fetched successfully",
		})
	});


exports.getAllStudentsByAdmin = AsyncHandler( 
	async (req, res) => {
		const students = await Student.find()
		res.status(200).json({
			status: "success",
			message: "Students fetched successfully",
			data: students,
		});
	})



exports.getStudentByAdmin = AsyncHandler( 
	async (req, res) => {
		const studentID = req.params.studentID;
		const student = await Student.findById(studentID);
		if (!student){
			throw new Error("Student not found .")
		}
		res.status(200).json({
			status: "success",
			message: "Student fetched successfully",
			data: student,
		});
	})



exports.studentUpdateProfile = AsyncHandler(
async (req, res) => {

	const { email, password } = req.body;

	const emailExist = await Student.findOne({ email });
	if(emailExist) {
		throw new Error("this email is taken/exist");
	}

	if (password) {
		const student = await Student.findByAndUpdate(
			req.userAuth._id,
			{
				email,
				password: await hashPassword(password),
			},
			{
				new: true,
				runValidators: true,
			}
		);
		res.status(200).json({
			status: "success",
			data: student,
			message: "Student updated succesfully",
		});
	}
	else {
		const student = await Student.findByIdAndUpdate(
			req.userAuth._id,
			{
				email,
			},
			{
				new: true,
				runValidators: true,
			}
		);
		res.status(200).json({
			status: "success",
			data: student,
			message: "Student updated successfully",
		});
	}
});



exports.adminUpdateStudent = AsyncHandler(
	async(req, res) => {
		const { classLevels, academicYear, program, name, email, prefectName, isSuspended, isWithdrawn } = req.body;

		const studentFound = await Student.findById(req.params.studentID);
		if (!studentFound) {
			throw Error("no student found");
		}

		const studentUpdated = await Student.findByIdAndUpdate(req.params.studentID, {
	$set: {
		name,
		email,
		academicYear,
		program,
		prefectName,
		isSuspended,
		isWithdrawn,
	},
	$addToSet:{
		classLevels,
	},
		},{
			new: true,

		});
		res.status(200).json({
			status:"success",
			data: studentUpdated,
			messge: "Student updated successfully",
		})
	}
)







exports.writeExam = AsyncHandler(
async (req, res) => {


	const studentFound = await Student.findById(req.userAuth?._id);
	if (!studentFound) {
		throw new Error ("Student not found");
	}

	const examFound = await Exam.findById(req.params.examID)
		.populate("questions")
		.populate("academicTerm");
	if (!examFound) {
		throw new Error ("Exam not found");
	}

	const questions = examFound?.questions;

	const studentAnswers = req.body.answers;

if(studentAnswers.length !== questions.length) {
	throw new Error("you have not answered all the questions");
}

const studentFoundInResults = await ExamResult.findOne({
	student: studentFound?._id,
});

if (studentFoundInResults) {
	throw new Error("you have already taken this exam");
}


if(studentFound.isWithdrawn || studentFound.isSuspended) {
	throw new Error("you are suspended/withdrawn, you can't take this exam");
}


	let correctAnswers = 0;
	let wrongAnswers = 0;
	let totalQuestions = 0;
	let grade = 0;
	let score = 0;
	let answeredQuestions = [];
	let status = "";
	let remarks = "";



for(let i = 0; i < questions.length; i++) {
	const question = questions[i]
	
	if (question.correctAnswer === studentAnswers[i]) {
		correctAnswers++;
		score++;
		question.isCorrect = true;
	}
	else {
		wrongAnswers++;
	}
}

	totalQuestions = questions.length;
	grade = (correctAnswers / totalQuestions) * 100;
	answeredQuestions = questions.map(question => {
	return {
		question: question.question,
		correctAnswer: question.correctAnswer,
		isCorrect: question.isCorrect,
	}
	})

	if (grade >= 50) {
		status = "passed";
	}
	else {
		status = "failed";
	}


if (grade >= 80) {
	remarks = "Excellent";

}
else if (grade >= 70) {
	remarks = "Very Good";
}
else if (grade >= 60) {
	remarks = "Good";
}
else if (grade >= 50) {
	remarks = "Fair";
}
else {
	remarks = "Poor";
}


const examResults = await ExamResult.create({
	studentID: studentFound?.studentId,
	exam: examFound?._id,
	grade,
	score,
	status,
	remarks,
	classLevel: examFound?.classLevel,
	academicTerm: examFound?.academicTerm,
	academicYear: examFound?.academicYear,
	answeredQuestions: answeredQuestions,
})


studentFound.examResults.push(examResults?._id);
await studentFound.save();



console.log(examFound.academicTerm);
if (examFound.academicTerm.name === "2nd term 2022" && status === "passed" && studentFound?.currentClassicLevel === "level 100") {
	studentFound.classLevels.push("level 200");
	studentFound.currentClassicLevel = "level 200";
	await studentFound.save();
}


if (examFound.academicTerm.name === "2nd term 2022" && status === "passed" && studentFound?.currentClassicLevel === "level 200") {
	studentFound.classLevels.push("level 300");
	studentFound.currentClassicLevel = "level 300";
	await studentFound.save();
}


if (examFound.academicTerm.name === "2nd term 2022" && status === "passed" && studentFound?.currentClassicLevel === "level 300") {
	studentFound.classLevels.push("level 400");
	studentFound.currentClassicLevel = "level 400";
	await studentFound.save();
}


if (examFound.academicTerm.name === "2nd term 2022" && status === "passed" && studentFound?.currentClassicLevel === "level 400") {
	studentFound.isGraduated = true;
	studentFound.yearGraduated = new Date();
	await studentFound.save();
}


res.status(200).json({
	status: "success",
	data: "You have submitted your exam. Check later for the results",
})
}
)


