const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacherModel');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/teachers');
    },
    filename: function (req, file, cb) {
        cb(null, 'teacher-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only .png, .jpg and .jpeg formats allowed!'));
    }
});

// Create a new teacher
router.post('/', upload.single('photo'), async (req, res) => {
    try {
        const teacherData = { ...req.body };
        
        // Add photo path if file was uploaded
        if (req.file) {
            teacherData.photo = req.file.path;
        }

        // Parse JSON strings back to objects/arrays
        if (typeof teacherData.subjects === 'string') {
            teacherData.subjects = JSON.parse(teacherData.subjects);
        }
        if (typeof teacherData.grades === 'string') {
            teacherData.grades = JSON.parse(teacherData.grades);
        }
        if (typeof teacherData.emergencyContact === 'string') {
            teacherData.emergencyContact = JSON.parse(teacherData.emergencyContact);
        }

        const teacher = new Teacher(teacherData);
        await teacher.save();
        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all teachers
router.get('/', async (req, res) => {
    try {
        const { department, status, subject, grade } = req.query;
        let query = {};

        // Apply filters if provided
        if (department) query.department = department;
        if (status) query.status = status;
        if (subject) query.subjects = subject;
        if (grade) query.grades = grade;

        const teachers = await Teacher.find(query);
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a teacher by ID
router.get('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a teacher by employee ID
router.get('/employee/:employeeId', async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ employeeId: req.params.employeeId });
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a teacher
router.put('/:id', upload.single('photo'), async (req, res) => {
    try {
        const teacherData = { ...req.body };
        
        // Add photo path if new file was uploaded
        if (req.file) {
            teacherData.photo = req.file.path;
        }

        // Parse JSON strings if needed
        if (typeof teacherData.subjects === 'string') {
            teacherData.subjects = JSON.parse(teacherData.subjects);
        }
        if (typeof teacherData.grades === 'string') {
            teacherData.grades = JSON.parse(teacherData.grades);
        }
        if (typeof teacherData.emergencyContact === 'string') {
            teacherData.emergencyContact = JSON.parse(teacherData.emergencyContact);
        }

        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            teacherData,
            { new: true, runValidators: true }
        );

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update teacher status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Active', 'Inactive', 'On Leave'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a teacher
router.delete('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search teachers
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const teachers = await Teacher.find({
            $or: [
                { firstName: new RegExp(query, 'i') },
                { lastName: new RegExp(query, 'i') },
                { email: new RegExp(query, 'i') },
                { employeeId: new RegExp(query, 'i') },
                { department: new RegExp(query, 'i') }
            ]
        });
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;