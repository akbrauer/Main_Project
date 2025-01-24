const User = require('../models/user');
const Event = require('../models/event');

module.exports = async function(req){
    const user = await User.findOne({ username: req.user.username });
	let trash = req.body.trash;
	let dayof;
	if(trash.dayof === 'dayof'){
		dayof = 0;
	} else if(trash.dayof === 'before'){
		dayof = 1;
	}
	let initialDate = Date.parse(req.body.event.date) - (dayof * 1000 * 60 * 60 * 24 );
	for(x = 1; x <= trash.weeks; x++){
		let date = new Date(initialDate + ((x-1) * 1000 * 60 * 60 * 24 * 7)).toISOString().slice(0,10);
		let event = { date };
		event.user = req.user.username;
		if(trash.initial === 'trash'){
			if(x%2){
				event.title = 'Take Out Trash';
			} else {
				event.title = 'Take Out Trash & Recycling';
			};
		} else if(trash.initial === 'recycling'){
			if(x%2){
				event.title = 'Take Out Recycling';
			} else {
				event.title = 'Take Out Trash & Recycling';
			};
		} else if(trash.initial === 'both'){
			if(trash.frequency === 'neither'){
				event.title = 'Take Out Trash & Recycling';
			} else if(trash.frequency === 'both'){
				if(x%2){
					event.title = 'Take Out Trash & Recycling';
				} else {
					event.skip = true;
				};
			} else if(trash.frequency === 'trash'){
				if(x%2){
					event.title = 'Take Out Trash & Recycling';
				} else {
					event.title = 'Take Out Recycling';
				};
			} else if(trash.frequency === 'recycling'){
				if(x%2){
					event.title = 'Take Out Trash & Recycling';
				} else {
					event.title = 'Take Out Trash';
				};
			};
		};
		if(!event.skip){
			let newEvent = new Event(event);
			user.calendars[0].events.push(newEvent);
			await newEvent.save();
			await user.save();
		};
	};
};
