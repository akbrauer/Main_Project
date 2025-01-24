const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Todo = require("../models/todo");
const Event = require("../models/event");

const { isLoggedIn, addUser, validateEvent, validateTodo } = require('../middleware');

const catchAsync = require("../utils/catchAsync");
const createTrashSchedule = require('../utils/createTrashSchedule');

router.get("/calendar", catchAsync(async (req, res) => {
	if (req.user) {
		console.log(req.user.username);
		const user = await User.findOne({ username: req.user.username }).populate("calendars.todos").populate("calendars.events");
		console.log("user: ", user);
		res.render("calendar", { user });
	} else {
		const user = await User.findOne({ username: 'guest' }).populate("calendars.todos").populate("calendars.events");
		console.log("user: ", user);
		res.render("calendar", { user });
	}
}));

router.post("/calendar/todo", isLoggedIn, addUser, validateTodo, catchAsync(async (req, res) => {
		const user = await User.findOne({ username: req.user.username });
		let newTodo = new Todo(req.body.todo);
		user.calendars[0].todos.push(newTodo);
		await newTodo.save();
		await user.save();
		req.flash("success", `${newTodo.title} added to unscheduled events`);
		res.redirect("/calendar");
}));

router.put("/calendar/todo", isLoggedIn, catchAsync(async (req, res) => {
	//Add validateTodo middlware by changing body.itemId to /calendar/todo/:id
	const todo = await Todo.findOneAndUpdate({ _id: req.body.itemId }, { title: req.body.todo.title });
	await todo.save();
	req.flash("success", `${todo.title} updated`);
	res.redirect("/calendar");
}));

router.delete("/calendar/todo", isLoggedIn, catchAsync(async (req, res) => {
	//Add validateTodo middlware by changing body.itemId to /calendar/todo/:id
		let todo = await Todo.findOneAndDelete({ _id: req.body.itemId });
		req.flash("success", `${todo.title} deleted`);
		res.redirect("/calendar");
}));

router.patch("/calendar/todo", isLoggedIn, catchAsync(async (req, res) => {
	//Add validateEvent middlware by changing body.itemId to /calendar/todo/:id
	const user = await User.findOne({ username: req.user.username });
	let newEvent = new Event(req.body.event);
	user.calendars[0].events.push(newEvent);
	await newEvent.save();
	await user.save();
	await Todo.findOneAndDelete({ _id: req.body.itemId });
	req.flash("success", `${newEvent.title} added to calendar`);
	res.redirect("/calendar");
}));

router.post("/calendar/event", isLoggedIn, addUser, validateEvent, catchAsync(async (req, res) => {
		const user = await User.findOne({ username: req.user.username });
		const newEvent = new Event(req.body.event);
		user.calendars[0].events.push(newEvent);
		await newEvent.save();
		await user.save();
		req.flash("success", `${newEvent.title} added to calendar`);
		res.redirect("/calendar");
}));

router.put("/calendar/event", isLoggedIn, catchAsync(async (req, res) => {
	//Add validateEvent middlware by changing body.eventId to /calendar/event/:id
	const event = await Event.findOneAndUpdate({ _id: req.body.eventId }, { ...req.body.event });
	await event.save();
	req.flash("success", `${event.title} updated`);
	res.redirect("/calendar");
}));

router.delete("/calendar/event", isLoggedIn, catchAsync(async (req, res) => {
	//Add validateEvent middlware by changing body.eventId to /calendar/event/:id
	let event = await Event.findOneAndDelete({ _id: req.body.eventId });
	req.flash("success", `${event.title} deleted`);
	res.redirect("/calendar");
}));

router.post("/calendar/event/trash", isLoggedIn, catchAsync(async (req, res) => {
	//Restructure to allow Joi Schema validation
	//Possibly create separate eventMultiJoiSchema with array of valid event objects
	//and switch logic to server-side in calendarScripts onclick
	//Create /calendar/event/multi route??
	await createTrashSchedule(req);
	req.flash("success", `Trash pickup schedule added to calendar`);
	res.redirect("/calendar");
}));

module.exports = router;
