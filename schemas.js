const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers){
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if(clean !== value) return helpers.error('string.escapeHTML', {value})
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.eventJoiSchema = Joi.object({
    event: Joi.object({
        user: Joi.string().escapeHTML().required(),
        title: Joi.string().escapeHTML().required(),
        date: Joi.string().escapeHTML().required(),
        time: Joi.string().escapeHTML().empty(''),
        notes: Joi.string().escapeHTML().empty('')
    }).required()
});

module.exports.todoJoiSchema = Joi.object({
    todo: Joi.object({
        user: Joi.string().escapeHTML().required(),
        title: Joi.string().escapeHTML().required(),
    }).required()
});