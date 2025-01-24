const express = require("express");
const router = express.Router();
const passport = require("passport");
const { v4: uuid } = require("uuid");
const User = require("../models/user");

const { storeReturnTo } = require('../middleware');
const catchAsync = require("../utils/catchAsync");
const setGuestDemo = require("../utils/setGuestDemo");

router.get("/signup", (req, res) => {
	res.render("users/signup");
});

router.post("/signup", catchAsync(async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const calendars = [{ todos: [], events: [] }];
		const user = new User({ email, username, calendars });
		const registeredUser = await User.register(user, password);
		console.log(registeredUser);
		req.login(registeredUser, err => {
			if (err) return next(err);
			req.flash("success", `Welcome ${registeredUser.username}`);
			res.redirect("/calendar");
		});
	} catch (e) {
		req.flash("error", e.message);
		res.redirect("/signup");
	}
}));

router.get("/login", (req, res) => {
	res.render("users/login");
});

router.post("/login", storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), (req, res) => {
	req.flash("success", `Logged in ${req.user.username}`);
	const redirectUrl = res.locals.returnTo || '/calendar';
	res.redirect(redirectUrl);
});

router.get("/logout", (req, res, next) => {
	if (req.user) {
		req.logout(function (err) {
			if (err) {
				return next(err);
			}
			req.flash("success", `user logged out.`);
			res.redirect("/calendar");
		});
	}
});

router.post("/demo", catchAsync(async (req, res) => {
		const id = uuid();
		const email = `${id}@gmail.com`;
		const username = `GuestDemo${id}`;
		const password = `${id}`;
		const calendars = [{ todos: [], events: [] }];
		setGuestDemo(calendars, username);
		const user = new User({ email, username, calendars, isDemo: true });
		const registeredUser = await User.register(user, password);
		console.log(registeredUser);
		req.login(registeredUser, err => {
			if (err) return next(err);
			req.flash("success", `Successfully started Guest Demo`);
			res.redirect("/calendar");
		});
}));

module.exports = router;
