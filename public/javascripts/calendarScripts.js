//Removed APOD API Implementation due to excessive API calls
// const fetchData = async function (date) {
// 	if (date) {
// 		apodURL = `https://api.nasa.gov/planetary/apod?api_key=${apodKey}&date=${date}`;
// 	} else {
// 		apodURL = `https://api.nasa.gov/planetary/apod?api_key=${apodKey}`;
// 	}
// 	const data = await fetch(apodURL);
// 	const parsed = await data.json();
// 	return parsed;
// };

// const setBackground = async function (date) {
// 	let data = await fetchData(date);
// 	if (data.media_type !== "image") {
// 		console.log(`Call did not return image, returned ${data.media_type}`);
// 		let getNewData = async function () {
// 			for (let x = 1; x < 5; x++) {
// 				const newDate = new Date(Date.parse(date) - x * 1000 * 60 * 60 * 24).toISOString().slice(0, 10);
// 				console.log(`Date ${x} days before`, newDate);
// 				let newData = await fetchData(newDate);
// 				console.log(`Data for ${x} days before: `, newData);
// 				if (newData.media_type === "image") {
// 					console.log("Media type is image now");
// 					return newData;
// 				}
// 			}
// 		};
// 		data = await getNewData();
// 	}
// 	console.log(data);
// 	document.querySelector(".calendar-content").style.backgroundImage = `url(${data.url})`;
// 	console.log(document.querySelector(".calendar-content").style.backgroundImage);
// };

const numToMonth = function (num) {
	switch (num) {
		case 0:
			return "January";
		case 1:
			return "February";
		case 2:
			return "March";
		case 3:
			return "April";
		case 4:
			return "May";
		case 5:
			return "June";
		case 6:
			return "July";
		case 7:
			return "August";
		case 8:
			return "September";
		case 9:
			return "October";
		case 10:
			return "November";
		case 11:
			return "December";
	}
};

const addZero = function (num) {
	if (num < 10) {
		return "0" + num;
	} else {
		return num;
	}
};

const fillModal = function (type, id) {
	let todo = document.querySelector(`#item-${id}`).innerText;
	if (type === "schedule") {
		document.querySelector("#schedule-id").value = id;
		document.querySelector("#schedule-name").value = todo;
		console.log("fillScheduler");
	} else if (type === "delete") {
		document.querySelector("#delete-id").value = id;
		document.querySelector("#delete-name").innerText = todo;
		console.log("fillDelete");
	} else if (type === "edit") {
		document.querySelector("#edit-id").value = id;
		document.querySelector("#edit-name").value = todo;
		console.log("fillEdit");
	}
};

const fillEventModal = function (type, id) {
	let eventName = document.querySelector(`#event-${id}`).innerText;
	if (type === "delete") {
		document.querySelector("#delete-event-id").value = id;
		document.querySelector("#delete-event-name").innerText = eventName;
		console.log("fillEventDelete");
	} else if (type === "edit") {
		let eventDate = document.querySelector(`#popoverDetails-${id} span.eventDateOrig`).innerText;
		let eventTime;
		if (document.querySelector(`#popoverDetails-${id} span.eventTime`)) {
			eventTime = document.querySelector(`#popoverDetails-${id} span.eventTime`).innerText;
		}
		let eventNotes;
		if (document.querySelector(`#popoverDetails-${id} span.eventNotes`)) {
			eventNotes = document.querySelector(`#popoverDetails-${id} span.eventNotes`).innerText;
		}
		document.querySelector("#edit-event-id").value = id;
		document.querySelector("#edit-event-name").value = eventName;
		document.querySelector("#edit-event-date").value = eventDate;
		if (eventTime !== undefined) {
			document.querySelector("#edit-event-time").value = eventTime;
		} else {
			document.querySelector("#edit-event-time").value = "";
		}
		if (eventNotes !== undefined) {
			document.querySelector("#edit-event-notes").value = eventNotes;
		} else {
			document.querySelector("#edit-event-notes").value = "";
		}
		console.log("fillEventEdit");
	}
};

const addMonthBorders = function () {
	let days = document.querySelectorAll(".calDay");
	let borders = 0;
	let corners = 0;
	for (x = 0; x < days.length; x++) {
		//Adding grey borders to bottom of month boundary
		if (borders < 7) {
			if (days[x + 7] && days[x].id.slice(3, 5) > days[x + 7].id.slice(3, 5)) {
				// console.log("border region");
				days[x].classList.add("calDayEnd");
				borders++;
			}
		}
		//Adding grey borders to right of month boundary
		if (corners < 2) {
			if (days[x + 1] && days[x].id.slice(3, 5) > days[x + 1].id.slice(3, 5)) {
				// console.log("corner");
				days[x].classList.add("calDayCorner");
				corners++;
			}
		}
	}
};

//Arg: daysFromToday = - when before, + when after Date.now()
const getTargetDate = function (daysFromToday) {
	const dayInMs = 1000 * 60 * 60 * 24;
	const daysFromTodayMs = Date.now() + (daysFromToday * dayInMs);
	const withViewerOffset = daysFromTodayMs + (offset * dayInMs)
	return new Date(withViewerOffset);
};

const fillCalendarDates = (targetWeek, targetDay, calDay, calDate) => {
	const weeksBetween = targetWeek * 7;
	const daysFromToday = targetDay - today.getDay() + weeksBetween;
	const dateObj = getTargetDate(daysFromToday);
	const dateVal = dateObj.getDate();
	calDate.innerText = dateVal;
	calDay.setAttribute("id", dateObj.toISOString().slice(5,10));
}

const buildCalendarFrame = () => {
	let calendarBody = document.querySelector(".calendar-body");
	calendarBody.innerHTML = "";

	for (let week = 0; week < 5; week++) {
		const calWeek = document.createElement("div");
		calWeek.classList.add("calWeek");

		for (let day = 0; day < 7; day++) {
			const calDay = document.createElement("div");
			calDay.classList.add("calDay", 'overflow-y-hidden');
			if (day === 6) calDay.classList.add("bd-rightside");
			const calDayHeader = document.createElement('div');
			calDayHeader.classList.add('calDayHeader', 'd-flex');
			const calDate = document.createElement("div");
			calDate.classList.add("calDate");
			const calDayBody = document.createElement("div");
			calDayBody.classList.add('calDayBody');

			fillCalendarDates(week, day, calDay, calDate);

			calDayHeader.appendChild(calDate);
			calDay.appendChild(calDayHeader);
			calDay.appendChild(calDayBody);
			calWeek.appendChild(calDay);
		}
		calendarBody.appendChild(calWeek);
	}
}

const createPopoverContent = (event) => {
	let popContent = `<div class="d-flex flex-row-reverse popButtons mt-1">
			<button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteEventModal" onclick="fillEventModal('delete', '${event._id}')">Delete</button>
			<button class="btn btn-sm btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#editEventModal" onclick="fillEventModal('edit', '${event._id}')">Edit</button>
		</div>`;

	let details = `<div id="popoverDetails-${event._id}">`;
	if (event.time) {
		details += '<span class="eventTime">' + event.time + " </span>";
	}
	details += `<span class="eventDateOrig d-none">${event.date}</span>`;
	details += '<span class="eventDate">' + numToMonth(+event.date.slice(5, 7) - 1) + " ";
	let eventMonth = event.date.slice(8, 10);
	if (eventMonth.startsWith(0)) {
		eventMonth = eventMonth.slice(1);
	}
	details += eventMonth + ", " + event.date.slice(0, 4) + "";
	if (event.notes) {
		details += '</br><span class="eventNotes">' + event.notes + "</span></div>";
	}
	return [popContent, details];
}

const addOverflowScroll = (element) => {
		let showOverflow = document.createElement('button');
		showOverflow.classList.add('show-overflow', 'btn', 'btn-link');
		showOverflow.setAttribute('type', 'button');
		showOverflow.innerText = "show more";
		element.children[0].appendChild(showOverflow);
		showOverflow.addEventListener('click', (e) => {
			e.target.parentElement.parentElement.classList.toggle('overflow-y-hidden');
			e.target.parentElement.parentElement.classList.toggle('overflow-y-scroll');
			if(e.target.innerText === 'show more'){
				e.target.innerText = 'hide';
			} else {
				e.target.innerText = "show more";
			};
		});
}

const addEvents = () => {
	for (let event of calendars.events) {
		let monthDay = event.date.slice(5, 10);
		const dayOfEvent = document.getElementById(monthDay);
		if (dayOfEvent) {
			const newEvent = document.createElement("button");
			newEvent.classList.add('btn', 'unstyled');
			newEvent.setAttribute("data-bs-toggle", "popover");
			newEvent.setAttribute("data-bs-trigger", "focus");
			newEvent.setAttribute("data-bs-title", event.title);
			newEvent.setAttribute("aria-haspopup", "true");
			const [ popContent, details] = createPopoverContent(event);
			newEvent.setAttribute("data-bs-content", details + popContent);

			let dot = document.createElement('span');
			dot.classList.add('mydot');
			newEvent.appendChild(dot);

			let newText = document.createElement("span");
			newText.classList.add("shiftL");
			newText.setAttribute("id", `event-${event._id}`);
			newText.innerText = event.title;
			newEvent.appendChild(newText);
			dayOfEvent.children[1].appendChild(newEvent);

			if(dayOfEvent.scrollHeight > dayOfEvent.offsetHeight){
				addOverflowScroll(dayOfEvent);
			};
		};
	};
}

const refreshPopovers = () => {
	try {
		if(bootstrap){
			const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
			const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, {
			sanitize: false,
			html: true
			}));
		};
	} catch (error) {
		console.log("Initial Load: No popover refresh");
	}
}

const buildCalendar = offset => {
	buildCalendarFrame();

	//Set month heading
	const selectedMonth = document.querySelectorAll(".calWeek")[1].children[3].id;
	document.querySelector(".calMonth").innerText = (new Date(selectedMonth)).toLocaleDateString('default', {month: 'long'});

	addMonthBorders();

	addEvents();

	refreshPopovers();
};

const offsetCalendar = direction => {
	if (direction === "+") {
		offset = offset + 7;
	} else if (direction === "-") {
		offset = offset - 7;
	}
	buildCalendar(offset);
};

const customSubmitContacts = function () {
	console.log("custom submit");
	let dateInit = document.querySelector("#contacts-date").valueAsDate;
	console.log(dateInit);
	let dateMod = new Date(dateInit.setDate(dateInit.getDate() + 14));
	let dateFinal = dateMod.toISOString().slice(0, 10);
	console.log(dateFinal);
	document.querySelector("#contacts-date-final").value = dateFinal;
	document.querySelector("#form-contact").requestSubmit();
};

const addEventHandlers = () => {
	//Add Guest Demo Link Handler
	if(document.getElementById("guest-link")){
		window.addEventListener("load", function () {
			document.getElementById("guest-link").addEventListener("click", function (e) {
				e.preventDefault();
				document.getElementById("demo-form").submit();
			});
		});
	};
	//Add Trash Form Event Listeners
	document.querySelector("#trash-initial").addEventListener("change", function () {
		document.querySelector("#both-check").classList.add("d-none");
		document.querySelector("#trash-check").classList.add("d-none");
		document.querySelector("#recycling-check").classList.remove("d-none");
	});
	document.querySelector("#recycling-initial").addEventListener("change", function () {
		document.querySelector("#both-check").classList.add("d-none");
		document.querySelector("#trash-check").classList.remove("d-none");
		document.querySelector("#recycling-check").classList.add("d-none");
	});
	document.querySelector("#both-initial").addEventListener("change", function () {
		document.querySelector("#both-check").classList.remove("d-none");
		document.querySelector("#trash-check").classList.add("d-none");
		document.querySelector("#recycling-check").classList.add("d-none");
	});
	//Adding Default Date Values
	document.querySelector("#contacts-date").value = today.toISOString().slice(0, 10);
	document.querySelector("#trash-date").value = today.toISOString().slice(0, 10);
}

const today = new Date(Date.now());
console.dir(today);

let offset = 0;

// setBackground(today.toISOString().slice(0, 10));

buildCalendar(offset);

addEventHandlers();