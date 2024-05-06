const express = require("express");
const asyncHandler = require("express-async-handler");

const Animal = require("../db-models/animalModel");

const router = express.Router();

// Method GET, for sending back all animals
router.get(
	"/",
	asyncHandler(async (req, res) => {
		const animals = await Animal.find();
		res.json({ success: true, animals });
	})
);

// Method GET, for sending back a particular animal
router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const animalId = req.params.id;
		const animal = await Animal.findById(animalId);
		if (!animal) {
			return res
				.status(404)
				.json({ success: false, message: "Animal not found" });
		}
		res.json({ success: true, animal });
	})
);

// Method POST, for creating an Animal
router.post(
	"/",
	asyncHandler(async (req, res) => {
		const { name, species, age, gender, breed, color, weight } = req.body;
		const newAnimal = new Animal({
			name,
			species,
			age,
			gender,
			breed,
			color,
			weight,
		});
		const savedAnimal = await newAnimal.save();
		res.status(201).json({ success: true, animal: savedAnimal });
	})
);

// Method PUT, for updating an animal's data
router.put(
	"/:id",
	asyncHandler(async (req, res) => {
		const { name, species, age, gender, breed, color, weight } = req.body;

		const updatedAnimal = await Animal.findByIdAndUpdate(
			req.params.id,
			{
				name,
				species,
				age,
				gender,
				breed,
				color,
				weight,
			},
			{ new: true }
		);
		if (!updatedAnimal) {
			res.status(404).json({
				success: false,
				message: "animal not found",
			});
		} else {
			res.json({ success: true, animal: updatedAnimal });
		}
	})
);

// Method DELETE, for deleting all animals
router.delete(
	"/clear",
	asyncHandler(async (req, res) => {
		await Animal.deleteMany({});
		res.json({
			success: true,
			message: `Deleted all animals`,
		});
	})
);

// Method DELETE, for deleting an animal
router.delete(
	"/:id",
	asyncHandler(async (req, res) => {
		const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
		if (!deletedAnimal) {
			res.status(404).json({
				success: false,
				message: "animal not found",
			});
		} else {
			res.json({ success: true, message: "animal deleted successfully" });
		}
	})
);

module.exports = router;
