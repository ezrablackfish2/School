const AsyncHandler = require("express-async-handler");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Admin = require("../../model/Staff/Admin");


exports.createAcademicTerm = AsyncHandler(
	async(req, res) => {
	const {
		name,
		description,
		duration,
	} = req.body;

	const academicTerm = await AcademicTerm.findOne({ name })
	if (academicTerm) {
		throw new Error("Academic Term Already Exists.")
	}

	const academicTermCreated = await AcademicTerm.create({
		name, description, duration, createdBy: req.userAuth._id
	})
	const admin = await Admin.findById(req.userAuth._id);
	admin.academicTerms.push(academicTermCreated._id);
	await admin.save();
	res.status(202).json({
		status: "success",
		message: "Academic Term createed successfully",
		data: academicTermCreated,
	})
})


exports.getAcademicTerms = AsyncHandler(
	async(req, res) => {

	const academicTerms = await AcademicTerm.find();

	res.status(202).json({
		status: "success",
		message: "Academic Terms fetched successfully",
		data: academicTerms,
	})
}
)

exports.getAcademicTerm = AsyncHandler(
	async(req, res) => {

	const academicTerms = await AcademicTerm.findById(req.params.id);

	res.status(202).json({
		status: "success",
		message: "Academic Term fetched successfully",
		data: academicTerms,
	})
}
)

exports.updateAcademicTerm = AsyncHandler(
	async(req, res) => {
	const {
		name,
		description,
		duration,
	} = req.body;	
	const createAcademicTermFound = await AcademicTerm.findOne({name});
		if (createAcademicTermFound) {
			throw new Error("Academic term already exists");
		}

	const academicTerm = await AcademicTerm.findByIdAndUpdate(
		req.params.id, 
		{ 
			name, 
			description, 
			duration, 
			createdBy: req.userAuth._id 
		},
		{
			new: true,

		},
	);

	res.status(202).json({
		status: "success",
		message: "Academic Term updated successfully",
		data: academicTerm,
	})
}
)


exports.deleteAcademicTerm = AsyncHandler(
	async(req, res) => {

	await AcademicTerm.findByIdAndDelete(req.params.id);


	res.status(202).json({
		status: "success",
		message: "Academic Year deleted successfully",

	})
}
)

