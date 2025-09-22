const express = require('express');
const router = express.Router();
const Fee = require('../models/feeModel');
const Student = require('../models/registrationModel');

// Create a new fee
router.post('/', async (req, res) => {
    console.log(req.body);
    
    try {
        const { enrollNum, ...feeData } = req.body;
        
        // Find student by enrollment number
        const student = await Student.findOne({ enrollNum });
        if (!student) {
            return res.status(404).json({ error: 'Student not found with this enrollment number' });
        }
        
        // Create fee with student ID
        const fee = new Fee({
            ...feeData,
            studentId: student._id
        });
        
        await fee.save();
        res.status(201).json(fee);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

// Get all fees
router.get('/', async (req, res) => {
    try {
        const fees = await Fee.find().populate('studentId', 'firstName lastName enrollNum');
        res.json(fees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get fee by enrollment number
router.get('/getbyenroll/:enrollNum', async (req, res) => {
    try {
        const student = await Student.findOne({ enrollNum: req.params.enrollNum });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        const fees = await Fee.find({ studentId: student._id }).populate('studentId', 'firstName lastName enrollNum');
        res.json(fees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a fee by ID
router.get('/getbyid/:id', async (req, res) => {
    try {
        const fee = await Fee.findById(req.params.id).populate('studentId', 'firstName lastName enrollNum');
        if (!fee) {
            return res.status(404).json({ error: 'Fee not found' });
        }
        res.json(fee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a fee
router.put('/update/:id', async (req, res) => {
    try {
        const { enrollNum, ...feeData } = req.body;
        
        // If enrollNum is provided, find the student
        if (enrollNum) {
            const student = await Student.findOne({ enrollNum });
            if (!student) {
                return res.status(404).json({ error: 'Student not found with this enrollment number' });
            }
            feeData.studentId = student._id;
        }
        
        const fee = await Fee.findByIdAndUpdate(req.params.id, feeData, { new: true }).populate('studentId', 'firstName lastName enrollNum');
        if (!fee) {
            return res.status(404).json({ error: 'Fee not found' });
        }
        res.json(fee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a fee
router.delete('/delete/:id', async (req, res) => {
    try {
        const fee = await Fee.findByIdAndDelete(req.params.id);
        if (!fee) {
            return res.status(404).json({ error: 'Fee not found' });
        }
        res.json({ message: 'Fee deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
