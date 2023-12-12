const AsyncHandler = require("express-async-handler");
const  Program = require("../../model/Academic/Program");
const  Subject = require("../../model/Academic/Subject");
const Admin = require("../../model/Staff/Admin");
const YearGroup = require("../../model/Academic/YearGroup");

exports.createYearGroup = AsyncHandler(
	async(req, res) => {
	const {
		name,
		academicYear,

	} = req.body;

	const yeargroup = await YearGroup.findOne({ name })

	if (yeargroup) {
		throw new Error("Year Group/Graduation year already exists.")
	}

	const yearGroup = await YearGroup.create({
		name,
		academicYear,
		createdBy: req.userAuth._id,
	})

	const admin = await Admin.findById(req.userAuth._id);
	if (!admin) {
		throw new Error("Admin not found")
	}
	admin.yearGroups.push(yearGroup._id);
	await admin.save();



	res.status(202).json({
		status: "success",
		message: "Year Groups created successfully",
		data: yearGroup,
	})
})


exports.getYearGroups = AsyncHandler(
	async(req, res) => {

	const groups = await YearGroup.find();

	res.status(202).json({
		status: "success",
		message: "Year groups fetched successfully",
		data: groups,
	})
}
)

exports.getYearGroup = AsyncHandler(
	async(req, res) => {

	const group = await YearGroup.findById(req.params.id);

	res.status(202).json({
		status: "success",
		message: "Year Group fetched successfully",
		data: group,
	})
}
)

exports.updateYearGroup = AsyncHandler(
	async(req, res) => {
	const {
		name,
		academicYear,
	} = req.body;	
	const yearGroupFound = await YearGroup.findOne({name});
		if (yearGroupFound) {
			throw new Error("Year Group already exists");
		}

	const group = await YearGroup.findByIdAndUpdate(
		req.params.id, 
		{ 
			name, 
			academicYear,
			createdBy: req.userAuth._id 
		},
		{
			new: true,

		},
	);

	res.status(202).json({
		status: "success",
		message: "Year Group updated successfully",
		data: group,
	})
}
)


exports.deleteYearGroup = AsyncHandler(
	async(req, res) => {

	await YearGroup.findByIdAndDelete(req.params.id);


	res.status(202).json({
		status: "success",
		message: "Year Group deleted successfully",

	})
}
)

