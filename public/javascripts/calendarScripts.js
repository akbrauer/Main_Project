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
		let eventDate = document.querySelector(`#eventPopover-${id} span.eventDateOrig`).innerText;
		let eventTime;
		if (document.querySelector(`#eventPopover-${id} span.eventTime`)) {
			eventTime = document.querySelector(`#eventPopover-${id} span.eventTime`).innerText;
		}
		let eventNotes;
		if (document.querySelector(`#eventPopover-${id} span.eventNotes`)) {
			eventNotes = document.querySelector(`#eventPopover-${id} span.eventNotes`).innerText;
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

const buildCalendar = offset => {
	//Building Calendar
	const daysBefore = function (x) {
		return new Date(Date.now() + offset * 1000 * 60 * 60 * 24 - x * (1000 * 60 * 60 * 24));
	};
	let calendarBody = document.querySelector(".calendar-body");
	calendarBody.innerHTML = "";

	for (let w = 0; w < 5; w++) {
		let calWeek = document.createElement("div");
		calWeek.classList.add("calWeek");
		for (let d = 0; d < 7; d++) {
			let calDay = document.createElement("div");
			calDay.classList.add("calDay");
			if (d === 6) {
				calDay.classList.add("bd-rightside");
			}
			let calDate = document.createElement("div");
			calDate.classList.add("calDate");
			let dateObj;
			let dateVal;
			switch (w) {
				case 0:
					dateObj = daysBefore(today.getDay() - d);
					dateVal = dateObj.getDate();
					calDate.innerText = dateVal;
					calDay.setAttribute("id", addZero(dateObj.getMonth() + 1) + "-" + addZero(dateVal));
					break;
				case 1:
					dateObj = daysBefore(-(d + 1 + dl));
					dateVal = dateObj.getDate();
					calDate.innerText = dateVal;
					calDay.setAttribute("id", addZero(dateObj.getMonth() + 1) + "-" + addZero(dateVal));
					break;
				case 2:
					dateObj = daysBefore(-(d + 1 + dl + 7));
					dateVal = dateObj.getDate();
					calDate.innerText = dateVal;
					calDay.setAttribute("id", addZero(dateObj.getMonth() + 1) + "-" + addZero(dateVal));
					break;
				case 3:
					dateObj = daysBefore(-(d + 1 + dl + 14));
					dateVal = dateObj.getDate();
					calDate.innerText = dateVal;
					calDay.setAttribute("id", addZero(dateObj.getMonth() + 1) + "-" + addZero(dateVal));
					break;
				case 4:
					dateObj = daysBefore(-(d + 1 + dl + 21));
					dateVal = dateObj.getDate();
					calDate.innerText = dateVal;
					calDay.setAttribute("id", addZero(dateObj.getMonth() + 1) + "-" + addZero(dateVal));
					break;
			}
			calDay.appendChild(calDate);
			calWeek.appendChild(calDay);
		}
		calendarBody.appendChild(calWeek);
	}
	document.querySelector(".calMonth").innerText = numToMonth(parseInt(document.querySelectorAll(".calWeek")[1].children[3].id.slice(0, 2)) - 1);
	addMonthBorders();

	//Adding Events
	for (let event of calendars.events) {
		let popContent = `<div class="d-flex flex-row-reverse popButtons mt-1">
			<button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteEventModal" onclick="fillEventModal('delete', '${event._id}')">Delete</button>
			<button class="btn btn-sm btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#editEventModal" onclick="fillEventModal('edit', '${event._id}')">Edit</button>
		</div>`;
		let monthDay = event.date.slice(5, 10);
		if (document.getElementById(monthDay)) {
			let newEvent = document.createElement("li");
			newEvent.setAttribute("data-bs-toggle", "popover");
			newEvent.setAttribute("data-bs-trigger", "focus");
			newEvent.setAttribute("data-bs-title", event.title);
			let blob = `<div id="eventPopover-${event._id}">`;
			if (event.time) {
				blob += '<span class="eventTime">' + event.time + " </span>";
			}
			blob += `<span class="eventDateOrig d-none">${event.date}</span>`;
			blob += '<span class="eventDate">' + numToMonth(+event.date.slice(5, 7) - 1) + " ";
			let eventMonth = event.date.slice(8, 10);
			if (eventMonth.startsWith(0)) {
				eventMonth = eventMonth.slice(1);
			}
			blob += eventMonth + ", " + event.date.slice(0, 4) + "";
			if (event.notes) {
				blob += '</br><span class="eventNotes">' + event.notes + "</span></div>";
			}
			newEvent.setAttribute("data-bs-content", blob + popContent);
			let newText = document.createElement("a");
			newText.classList.add("unstyled", "shiftL");
			newText.setAttribute("tabindex", "0");
			newText.setAttribute("id", `event-${event._id}`);
			newEvent.appendChild(newText);
			newText.innerText = event.title;
			document.getElementById(monthDay).appendChild(newEvent);
		}
	}

	//Refreshing Popovers
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

const today = new Date(Date.now());
const dl = 6 - today.getDay();
console.dir(today);

let offset = 0;

// setBackground(today.toISOString().slice(0, 10));
buildCalendar(offset);

//Adding Guest Demo Link Handler
if(document.getElementById("guest-link")){
	window.addEventListener("load", function () {
		document.getElementById("guest-link").addEventListener("click", function (e) {
			e.preventDefault();
			document.getElementById("demo-form").submit();
		});
	});
};

//Adding Trash Form Event Listeners
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