const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Todo = require("../models/todo");
const Event = require("../models/event");

const catchAsync = require("../utils/catchAsync");
const wipeDemos = require("../utils/wipeDemos");

router.use((req, res, next) => {
	if(req.isAuthenticated() && req.user.isAdmin){
		next();
	} else {
		req.session.returnTo = req.originalUrl;
		req.flash("error", "Must be logged in as admin to access this");
		res.redirect("/login");
	};
});

router.get("/", (req, res) => {
	res.render("admin/admin");
});

router.get("/userManager", catchAsync(async (req, res) => {
	let allUsers = await User.find();
	res.render("admin/userManager", { allUsers });
}));

router.delete("/userManager/:id", catchAsync(async (req, res) => {
	const { id } = req.params;
	let user = await User.findById(id);
	console.log("user found: ", user);
	//Replace with UserSchema middlware post FindOneAndDelete
	user.calendars.forEach(calendar => {
			calendar.todos.forEach(async function (todo){
				await Todo.findOneAndDelete({_id: todo.id});
				console.log(`Todo ${todo._id} deleted!`);
			});
			calendar.events.forEach(async function (event){
				await Event.findOneAndDelete({_id: event.id});
				console.log(`Event ${event._id} deleted!`);
			});
	});
	await User.findOneAndDelete({_id: id});
	console.log(`${user.username} deleted!`);
	req.flash("success", `Successfully deleted user ${user.username}`);
	res.redirect("/admin/userManager");
}));

router.post("/wipe", catchAsync(async (req, res) => {
	wipeDemos();
	req.flash("success", "Successfully deleted all GuestDemo instances");
	res.redirect("/admin");
}));

module.exports = router;
