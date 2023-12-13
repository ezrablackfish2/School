const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");
const AsyncHandler = require("express-async-handler");


exports.createExam = AsyncHandler(
	async(req, res) => {
		const {
			name, 
			description, 
			subject, 
			program, 
			academicTerm,
			duration,
			examDate,
			examTime,
			examType,
			createdBy,
			academicYear,
			classLevel,
		} = req.body;

		const TeacherFound = await Teacher.findById(req.userAuth?._id);
		if (!TeacherFound) {
			throw new Error("Teacher not Found");
		}

		const examExists = await Exam.findOne({ name }); 
		if (examExists) {
			throw new Error("Exam already exists");
		}

		const examCreated = await new Exam({
			name, 
			description, 
			academicTerm, 
			academicYear, 
			classLevel, 
			createdBy,
			duration,
			examDate,
			examTime,
			examType,
			subject,
			program,
			createdBy: req.userAuth._id,
		});

	TeacherFound.examsCreated.push(examCreated._id);

	await examCreated.save();
	await TeacherFound.save();
	res.status(201).json({
		status: "success",
		message: "Exam created",
		data: examCreated,
	})
})



exports.getExams = AsyncHandler(
	async(req, res) => {

	const exams = await Exam.find().populate({
		path: "questions",
		populate: {
			path: "createdBy",
		}
	});

	res.status(202).json({
		status: "success",
		message: "exams fetched successfully",
		data: exams,
	})
}
)



exports.getExam = AsyncHandler(
	async(req, res) => {

	const exam = await Exam.findById(req.params.id);

	res.status(202).json({
		status: "success",
		message: "Exam fetched successfully",
		data: exam,
	})
}
)



exports.updateExam = AsyncHandler(
	async(req, res) => {


	const {
		name, 
		description, 
		subject, 
		program, 
		academicTerm,
		duration,
		examDate,
		examTime,
		examType,
		createdBy,
		academicYear,
		classLevel,
	} = req.body;

	const examFound = await Exam.findOne({name});
		if (examFound) {
			throw new Error("Exam already exists");
		}

	const examUpdated = await Exam.findByIdAndUpdate(
		req.params.id, 
		{ 
			name, 
			description, 
			subject, 
			program, 
			academicTerm,
			duration,
			examDate,
			examTime,
			examType,
			createdBy,
			academicYear,
			classLevel,
			createdBy: req.userAuth._id 
		},
		{
			new: true,

		},
	);

	res.status(201).json({
		status: "success",
		message: "Exam updated successfully",
		data: examUpdated,
	})
}
)


