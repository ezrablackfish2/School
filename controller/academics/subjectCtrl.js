const AsyncHandler = require("express-async-handler");
const  Program = require("../../model/Academic/Program");
const  Subject = require("../../model/Academic/Subject");
const Admin = require("../../model/Staff/Admin");


exports.createSubject = AsyncHandler(
	async(req, res) => {
	const {
		name,
		description,
		duration,
		academicTerm

	} = req.body;

	const programFound = await Program.findById(req.params.programID)

	if (!programFound) {
		throw new Error("Program not found.")
	}

	const subjectFound = await Subject.findOne({name});
	if (subjectFound) {
		throw new Error("Subject already exists");
	}

	const subjectCreated = await Subject.create({
		name, description, academicTerm, duration, createdBy: req.userAuth._id
	})

	programFound.subjects.push(subjectCreated._id);
	await programFound.save();

	res.status(202).json({
		status: "success",
		message: "Subject created successfully",
		data: subjectCreated,
	})
})


exports.getSubjects = AsyncHandler(
	async(req, res) => {

	const subjects = await Subject.find();

	res.status(202).json({
		status: "success",
		message: "Subjects fetched successfully",
		data: subjects,
	})
}
)

exports.getSubject = AsyncHandler(
	async(req, res) => {

	const subject = await Subject.findById(req.params.id);

	res.status(202).json({
		status: "success",
		message: "Subject fetched successfully",
		data: subject,
	})
}
)

exports.updateSubject = AsyncHandler(
	async(req, res) => {
	const {
		name,
		description,
		academicTerm,
	} = req.body;	
	const subjectFound = await Subject.findOne({name});
		if (subjectFound) {
			throw new Error("Subject already exists");
		}

	const subject = await Subject.findByIdAndUpdate(
		req.params.id, 
		{ 
			name, 
			description,
			academicTerm,
			createdBy: req.userAuth._id 
		},
		{
			new: true,

		},
	);

	res.status(201).json({
		status: "success",
		message: "Subject updated successfully",
		data: subject,
	})
}
)


exports.deleteSubject = AsyncHandler(
	async(req, res) => {

	await Subject.findByIdAndDelete(req.params.id);


	res.status(202).json({
		status: "success",
		message: "Subject deleted successfully",

	})
}
)

