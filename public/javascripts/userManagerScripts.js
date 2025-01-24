const fillUserManagerModal = function (username, userID) {
	console.log("fillUserManagerModal");
	document.querySelector("#userManagerModalLabel").innerText = `Delete user: ${username}?`;
	document.querySelector("#userManager-prompt").innerText = `Are you sure you want to delete the user ${username} and all of their calendars, todos and events from the database?`;
	document.querySelector("#userManager-form").setAttribute("action", `/admin/userManager/${userID}?_method=DELETE`);
};