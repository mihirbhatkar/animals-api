const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	species: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	gender: {
		type: String,
		enum: ["male", "female", "other"],
		required: true,
	},
	breed: String,
	color: String,
	weight: Number,
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
