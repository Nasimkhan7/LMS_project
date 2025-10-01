const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    address: {
        type: String,
        trim: true
    },
    photo: {
        type: String // Store the file path or URL
    },
    employeeId: {
        type: String,
        required: [true, 'Employee ID is required'],
        unique: true,
        trim: true
    },
    department: {
        type: String,
        trim: true
    },
    qualification: {
        type: String,
        trim: true
    },
    experience: {
        type: Number,
        min: 0
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    salary: {
        type: Number,
        min: 0
    },
    subjects: [{
        type: String,
        trim: true
    }],
    grades: [{
        type: String,
        trim: true
    }],
    emergencyContact: {
        name: {
            type: String,
            trim: true
        },
        relationship: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        }
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'On Leave'],
        default: 'Active'
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

// Create index for faster queries
teacherSchema.index({ employeeId: 1, email: 1 });

// Virtual for teacher's full name
teacherSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to ensure required fields
teacherSchema.pre('save', function(next) {
    // Convert email to lowercase
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    next();
});

// Instance method to check if teacher is active
teacherSchema.methods.isActive = function() {
    return this.status === 'Active';
};

// Static method to find teachers by department
teacherSchema.statics.findByDepartment = function(department) {
    return this.find({ department: department });
};

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;