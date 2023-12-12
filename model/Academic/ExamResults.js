const mongoose = required("mongoose");

const { Schema } = mongoose;

const examResultSchema = new Schema(
	{
		student: {
			type: Schema.Types.ObjectId,
			ref: "Student",
			required: true,
		},
		exam: {
			type: Schema.Types.ObjectId,
			ref: "Exam",
			required: true,
		},
		grade: {
			type: Number,
			required: true,
		},
		score: {
			type: Number,
			required: true,
		},
		passMark: {
			type: Number,
			required: true,
			default: 50,
		},
		status: {
			type: String,
			required: true,
			enum: ["failed", "passed"],
		},

		remarks: {
			type: String,
			required: true,
			enum: ["Excellent", "Good", "Poor"],
			default: "Poor",
		},
		position: {
			type: Number,
			required: true,
		},
		subject: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Subject",
		},
		classLevel: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ClassLevel",
		},
		academicTerm: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "AcademicTerm",
			required: true,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const ExamResult = mongoose.model("ExamResult", examResultSchema);

module.exports = ExamResult;
