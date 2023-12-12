const AsyncHandler = require("express-async-handler");
const  Program = require("../../model/Academic/Program");
const Admin = require("../../model/Staff/Admin");


exports.createProgram = AsyncHandler(
	async(req, res) => {
	const {
		name,
		description,
		duration,

	} = req.body;

	const programFound = await Program.findOne({ name })
	if (programFound) {
		throw new Error("Program Already Exists.")
	}

	const programCreated = await Program.create({
		name, description, duration, createdBy: req.userAuth._id
	})
	const admin = await Admin.findById(req.userAuth._id);
	admin.programs.push(programCreated._id);
	await admin.save();
	res.status(202).json({
		status: "success",
		message: "Program created successfully",
		data: programCreated,
	})
})


exports.getPrograms = AsyncHandler(
	async(req, res) => {

	const programs = await Program.find();

	res.status(202).json({
		status: "success",
		message: "Programs fetched successfully",
		data: programs,
	})
}
)

exports.getProgram = AsyncHandler(
	async(req, res) => {

	const program = await Program.findById(req.params.id);

	res.status(202).json({
		status: "success",
		message: "Program fetched successfully",
		data: program,
	})
}
)

exports.updateProgram = AsyncHandler(
	async(req, res) => {
	const {
		name,
		description,
		duration,
	} = req.body;	
	const programFound = await Program.findOne({name});
		if (programFound) {
			throw new Error("Program already exists");
		}

	const program = await Program.findByIdAndUpdate(
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
		message: "Program updated successfully",
		data: program,
	})
}
)


exports.deleteProgram = AsyncHandler(
	async(req, res) => {

	await Program.findByIdAndDelete(req.params.id);


	res.status(202).json({
		status: "success",
		message: "Program deleted successfully",

	})
}
)

