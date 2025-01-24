const { eventJoiSchema, todoJoiSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    console.log("req.user...", req.user);
    if (!req.isAuthenticated()) {
		req.flash("error", "Please log in to make changes to the calendar");
		res.redirect("/calendar");
	} else {
        next();
    };
}

module.exports.addUser = (req, res, next) => {
    if(req.body.event && !req.body.event.user){
        req.body.event.user = req.user.username;
    }
    if(req.body.todo && !req.body.todo.user){
        req.body.todo.user = req.user.username;
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    };
    next();
};

module.exports.validateEvent = ((req, res, next) => {
    const { error } = eventJoiSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    };
});

module.exports.validateTodo = ((req, res, next) => {
    const { error } = todoJoiSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    };
});