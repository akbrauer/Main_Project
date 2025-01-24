const express = require("express");
const router = express.Router();
const Recipe = require('../models/recipe.js');

const catchAsync = require("../utils/catchAsync");

router.get("/recipes", catchAsync(async (req, res) => {
	const recipes = await Recipe.find({});
	res.render("recipes/index", { recipes });
}))

router.get("/recipes/new", (req, res) => {
	res.render("recipes/new");
});

router.get("/recipes/:id", catchAsync(async (req, res) => {
	const recipe = await Recipe.findById(req.params.id);
	console.log(recipe);
	if(!recipe){
		req.flash('error', "Couldn't find that recipe!");
		res.redirect("/recipes");
	} else {
		res.render("recipes/show", { recipe });
	}
}))

router.post("/recipes/new/json", catchAsync(async (req, res) => {
	if (req.user && req.user.isAdmin) {
		try {
			let data = req.body.data;
			let parsed = JSON.parse(data);
			let recipe = new Recipe(parsed);
			await recipe.save();
			req.flash("success", `Successfully created recipe for ${recipe.name}`);
			res.redirect("/recipes");
		} catch(e){
			console.log(e);
			req.flash("error", `Error creating recipe, check your json formatting`);
			res.redirect("/admin");
		}
		
	} else {
		req.flash("error", "Must be logged in as admin to use this function");
		res.redirect("/login");
	}
}));

module.exports = router;
