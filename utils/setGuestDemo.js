const Todo = require("../models/todo");
const Event = require("../models/event");

const daysAfter = function (x) {
	let newDate = new Date(Date.now() + x * (1000 * 60 * 60 * 24));
	return newDate.toISOString().slice(0, 10);
};

let demoTodos = [
	{ title: "Mom's Birthday Present" },
	{ title: "Stop At Hardware Store" },
	{ title: "Haircut" },
	{ title: "Call Grandma" },
	{ title: "Fix Bike Chain" },
	{ title: "Clean Bathroom" },
];
let demoEvents = [
	{ title: "Gym - Leg Day", date: `${daysAfter(-7)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Gym - Arm Day", date: `${daysAfter(-4)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Gym - Leg Day", date: `${daysAfter(0)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Gym - Arm Day", date: `${daysAfter(3)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Gym - Leg Day", date: `${daysAfter(7)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Gym - Arm Day", date: `${daysAfter(10)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Gym - Leg Day", date: `${daysAfter(14)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Gym - Arm Day", date: `${daysAfter(17)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Gym - Leg Day", date: `${daysAfter(21)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Gym - Arm Day", date: `${daysAfter(24)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Gym - Leg Day", date: `${daysAfter(28)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Gym - Arm Day", date: `${daysAfter(31)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Gym - Leg Day", date: `${daysAfter(35)}`, time: "6pm", notes: "Go straight from work" },
	{ title: "Doctor's Appointment", date: `${daysAfter(2)}`, time: "1130am", notes: "Routine checkup" },
	{ title: "Pick Dad Up from Airport", date: `${daysAfter(7)}`, time: "8pm", notes: "Flying in from Denver" },
	{ title: "Package Delivery", date: `${daysAfter(13)}`, time: "1130am", notes: "Delivered to house" },
	{ title: "Dave's Birthday Party", date: `${daysAfter(18)}`, time: "1130am", notes: "At Irish bar" },
	{ title: "Work Party", date: `${daysAfter(23)}`, time: "1130am", notes: "At Bill's house" },
	{ title: "Game Night", date: `${daysAfter(30)}`, time: "1130am", notes: "Hosted at our house this time!" },
	{ title: "Dinner Party", date: `${daysAfter(33)}`, time: "1130am", notes: "Remember to bring wine." },
];

module.exports = async function (calendars, username) {
	demoTodos.forEach(async function (todo) {
		todo.user = username;
		let newTodo = new Todo(todo);
		calendars[0].todos.push(newTodo);
		await newTodo.save();
	});
	demoEvents.forEach(async function (event) {
		event.user = username;
		let newEvent = new Event(event);
		calendars[0].events.push(newEvent);
		await newEvent.save();
	});
};