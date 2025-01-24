const User = require('../models/user');
const Todo = require('../models/todo');
const Event = require('../models/event');

module.exports = async function(){
    //Replace with UserSchema middlware post FindOneAndDelete
    let demoUsers = await User.find({ isDemo: true }).populate('calendars.todos').populate('calendars.events');
    demoUsers.forEach(async function (demoUser){
        demoUser.calendars.forEach(calendar => {
            calendar.todos.forEach(async function (todo){
                await Todo.findOneAndDelete({_id: todo.id});
                console.log(`Todo ${todo._id} deleted!`);
            });
            calendar.events.forEach(async function (event){
                await Event.findOneAndDelete({_id: event.id});
                console.log(`Event ${event._id} deleted!`);
            });
        });
        await User.findOneAndDelete({_id: demoUser._id});
        console.log(`${demoUser.username} deleted!`);
    });
};