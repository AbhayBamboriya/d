const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: [true, 'Class name is required']
  },

  sectionName: {
    type: String,
    required: [true, 'Section name is required']
  },

  year: {
    type: String,
    required: [true, 'Year is required']
  },

  semester: {
    type: String,
    required: [true, 'Semester is required']
  },

  students: [
    {
      name: { type: String, required: true },
      enrollmentNo: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('Student', classSchema);
