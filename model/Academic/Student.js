const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		studentId: {
			type: String,
			required: true,
			default: function () {
				return (
					"STU" +
					Math.floor(100 + Math.random() * 900) +
					Date.now().toString().slice(2, 4) +
					this.name
					.split(" ")
					.map(name => name[0])
					.join("")
					.toUpperCase()
				);
			},
		},
		isWithdrawn: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			default: "student",
		},

		classLevels: [
			{
				type: String,
				ref: "ClassLevel",
//				required: true,
			},
		],
		currentClassicLevel: {
			type: String,
			default: function () {
				return this.classLevels[this.classLevels.length - 1];
			},
		},
		academicYear: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "AcademicYear",
//			required: true,
		},
		dateAdmitted: {
			type: Date,
			default: Date.now,
		},

		examResults: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "ExamResult",
			},
		],
		
		program: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Program",
//			required: true,
		},

		isPromotedToLevel200: {
			type: Boolean,
			default: false,
		},
		isPromotedToLevel300: {
			type: Boolean,
			default: false,
		},
		isPromotedToLevel400: {
			type: Boolean,
			default: false,
		},
		isGraduated: {
			type: Boolean,
			default: false,
		},
		isSuspended: {
			type: Boolean,
			default: false,
		},
		perfectName: {
			type: String,
		},
		financialReport: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "financialReprt",
			},
		],

		yearGraduated: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
