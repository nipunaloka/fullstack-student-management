// validators/studentValidator.js
const Joi = require('joi');

// Define the schema for student data validation
const studentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().min(18).max(100).required(),
  major: Joi.string().min(3).max(50).required(),
  courses: Joi.array().items(Joi.string()).optional()
});

const validateStudent = (data) => {
  return studentSchema.validate(data);
};

module.exports = validateStudent;
