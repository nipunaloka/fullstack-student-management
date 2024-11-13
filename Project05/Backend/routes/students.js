const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const validateStudent = require('../validators/studentValidator');

// Create a new student
router.post('/', async (req, res) => {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Read all students
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
          return res.status(404).send('Student not found');
        }
        res.json(student);
      } catch (err) {
        res.status(500).send('Server error');
      }
});

// Update a student
router.put('/:id', async (req, res) => {
    const { error } = validateStudent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
