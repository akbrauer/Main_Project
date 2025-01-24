const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Event = require("./event");
const Todo = require("./todo");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	calendars: {
        type: [
            {
                todos: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "Todo",
                        required: true,
                    },
                ],
                events: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: "Event",
                        require: true,
                    },
                ],
            },
        ],
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    isDemo: {
        type: Boolean,
        required: true,
        default: false,
    }
});

// userSchema.post('findOneAndDelete', async function(entry){
//     if(entry){
//         await Event.deleteMany({
//             _id: {
//                 $in: entry.calendars.events
//             }
//         });
//         await Todo.deleteMany({
//             _id: {
//                 $in: entry.calendars.todos
//             }
//         });
//     };
// });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
