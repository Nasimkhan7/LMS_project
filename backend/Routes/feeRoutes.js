const express = require('express');
const router = express.Router();
const Fee = require('../models/feeModel');

// Create a new fee
router.post('/', async (req, res) => {
    try {
        const fee = new Fee(req.body);
        await fee.save();
        res.status(201).json(fee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all fees
router.get('/', async (req, res) => {
    try {
        const fees = await Fee.find();
        res.json(fees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a fee by ID
router.get('/getbyid/:id', async (req, res) => {
    try {
        const fee = await Fee.findById(req.params.id);
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
        const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
