const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        name: Joi.string().required(),  // Name is required and should be a string
        email: Joi.string().email().required(),  // Email must be valid and required
        mobile: Joi.string()
            .pattern(/^[0-9]{10}$/)  // Mobile number must be 10 digits long
            .required(),
        designation: Joi.string().valid('Manager', 'HR', 'Sales').optional(),  // Optional field, but if provided must be one of these values
        gender: Joi.string().valid('Male', 'Female', 'Other').optional(),  // Optional gender field with valid options
        courses: Joi.array().items(Joi.string().valid('MCA', 'BCA', 'BSC')).optional(),  // Optional array of courses, each of which must be one of these values
        img: Joi.string().uri().allow('', null).optional()  // Optional image URL, can be empty or null
    }).required(),
    timestamps: true 
});


