const AsyncHandler = require("express-async-handler");
const ClassLevel = require("../../model/Academic/ClassLevel");
const Admin = require("../../model/Staff/Admin");


exports.createClassLevel = AsyncHandler(
	async(req, res) => {
	const {
		name,
		description,
	} = req.body;

	const classFound = await ClassLevel.findOne({ name })
	if (classFound) {
		throw new Error("Class Already Exists.")
	}

	const classCreated = await ClassLevel.create({
		name, description, createdBy: req.userAuth._id
	})
	const admin = await Admin.findById(req.userAuth._id);
	admin.classLevels.push(classCreated._id);
	await admin.save();
	res.status(202).json({
		status: "success",
		message: "Class created successfully",
		data: classCreated,
	})
})


exports.getClassLevels = AsyncHandler(
	async(req, res) => {

	const classes = await ClassLevel.find();

	res.status(202).json({
		status: "success",
		message: "Classes fetched successfully",
		data: classes,
	})
}
)

exports.getClassLevel = AsyncHandler(
	async(req, res) => {

	const classLevel = await ClassLevel.findById(req.params.id);

	res.status(202).json({
		status: "success",
		message: "Class fetched successfully",
		data: classLevel,
	})
}
)

exports.updateClassLevel = AsyncHandler(
	async(req, res) => {
	const {
		name,
		description,
	} = req.body;	
	const classFound = await ClassLevel.findOne({name});
		if (classFound) {
			throw new Error("Class Level already exists");
		}

	const classLevel = await ClassLevel.findByIdAndUpdate(
		req.params.id, 
		{ 
			name, 
			description,
			createdBy: req.userAuth._id 
		},
		{
			new: true,

		},
	);

	res.status(202).json({
		status: "success",
		message: "Class Level updated successfully",
		data: classLevel,
	})
}
)


exports.deleteClassLevel = AsyncHandler(
	async(req, res) => {

	await ClassLevel.findByIdAndDelete(req.params.id);


	res.status(202).json({
		status: "success",
		message: "Class Level deleted successfully",

	})
}
)

