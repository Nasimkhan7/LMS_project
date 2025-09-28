const express = require('express');
const router = express.Router();
const Registration = require('../models/registrationModel');

// Create a new registration
router.post('/', async (req, res) => {
    console.log(req.body);
    
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            email,
            phone,
            address,
            parentName,
            parentContact,
            grade,
            enrollNum,
            // registrationDate and status are optional
        } = req.body;

        const registration = new Registration({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            email,
            phone,
            address,
            parentName,
            parentContact,
            grade,
            enrollNum,
            // registrationDate and status will be set by default
        });

        await registration.save();
        res.status(201).json(registration);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

// Get all registrations
router.get('/', async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.json(registrations);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Search registration by enrollment number
router.get('/enrollment/:enrollNum', async (req, res) => {
    try {
        const { enrollNum } = req.params;
        
        if (!enrollNum) {
            return res.status(400).json({ error: 'Enrollment number is required' });
        }

        const registration = await Registration.findOne({ enrollNum: enrollNum });
        
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found with this enrollment number' });
        }
        
        res.json(registration);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Get a registration by ID
router.get('/:id', async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.json(registration);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a registration
router.put('/:id', async (req, res) => {
    try {
        const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.json(registration);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a registration
router.delete('/:id', async (req, res) => {
    try {
        const registration = await Registration.findByIdAndDelete(req.params.id);
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        res.json({ message: 'Registration deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
