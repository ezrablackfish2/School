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
			examStatus,
			examType,
			subject,
			program,

		});

	teacherFound.examsCreated.push(examCreated._id);

	await examCreated.save();
	await teacherFound.save();
	res.status(201).json({
		status: "success",
		message: "Exam created",
		data: examCreated,
	})
})
