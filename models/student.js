const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: //to be changed to branch name
  {
    type: String,
    required: [true, 'Class name is required']
  },
  year: 
  {
    type: String,
    enum: ['I', 'II','III','IV'],
  },
  sectionName: 
  {
    type: String,
    required: [true, 'Section name is required']
  },
  students:
  [{
    name: { type: String, required: true },
    enrollmentNo: { type: String, required: true,}  // Allows null/undefined but treats them as non-duplicates}
}]
});

module.exports = mongoose.model('Student', classSchema);
