const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    ingredients: [
        {
            amount: String,
            unit: String,
            name: {
                type: String,
                required: true,
            },
            notes: String,
            converted: {
                amount: String,
                unit: String,
            }
        }
    ],
    instructions: [
        String
    ],
    servings: {
        type: Number
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);