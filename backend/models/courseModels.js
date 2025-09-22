const mongoose = require("../connection");

// Course Schema for Schools
const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true, // e.g., "MATH5", "ENG7", "SCI10"
    },
    courseName: {
      type: String,
      required: true,
      trim: true, // e.g., "Mathematics Grade 5", "English Literature"
    },
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      enum: [
        "Mathematics",
        "English",
        "Science",
        "Social Studies",
        "History",
        "Geography",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
        "Physical Education",
        "Art",
        "Music",
        "Foreign Language",
        "Health Education",
        "Life Skills",
        "Other",
      ],
    },
    grade: {
      type: String,
      required: true,
      enum: [
        "Kindergarten",
        "Grade 1",
        "Grade 2",
        "Grade 3",
        "Grade 4",
        "Grade 5",
        "Grade 6",
        "Grade 7",
        "Grade 8",
        "Grade 9",
        "Grade 10",
        "Grade 11",
        "Grade 12",
      ],
    },
    level: {
      type: String,
      required: true,
      enum: ["Elementary", "Middle School", "High School"],
    },
    courseType: {
      type: String,
      required: true,
      enum: ["Core", "Elective", "Advanced", "Remedial", "Honors", "AP"],
      default: "Core",
    },
    prerequisites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Previous grade courses or requirements
      },
    ],
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher", // Primary teacher for the course
      required: true,
    },
    assistantTeachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher", // Additional teachers or aids
      },
    ],
    curriculum: {
      type: String, // File path or URL to curriculum document
    },
    textbook: {
      title: String,
      author: String,
      isbn: String,
      publisher: String,
      edition: String,
    },
    schedule: {
      days: [
        {
          type: String,
          enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        },
      ],
      timeSlot: {
        startTime: String, // e.g., "08:00"
        endTime: String, // e.g., "08:45"
      },
      classroom: String, // Classroom number or name
      duration: {
        type: Number, // Duration in minutes
        default: 45,
      },
    },
    classSize: {
      type: Number,
      required: true,
      min: 1,
      default: 30,
    },
    currentEnrollment: {
      type: Number,
      default: 0,
    },
    enrolledStudents: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        enrollmentDate: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["Active", "Transferred", "Dropped", "Completed"],
          default: "Active",
        },
      },
    ],
    academicYear: {
      type: String,
      required: true, // e.g., "2024-2025"
    },
    semester: {
      type: String,
      enum: ["Fall", "Spring", "Summer", "Full Year"],
      default: "Full Year",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Completed", "Cancelled"],
      default: "Active",
    },
    gradingSystem: {
      type: {
        type: String,
        enum: ["Letter", "Percentage", "Points", "Pass/Fail"],
        default: "Letter",
      },
      scale: {
        type: String,
        default: "A-F", // A-F, 0-100, 0-4.0, Pass/Fail
      },
    },
    assessmentWeights: {
      homework: {
        type: Number,
        default: 20, // Percentage weight
      },
      classParticipation: {
        type: Number,
        default: 10,
      },
      quizzes: {
        type: Number,
        default: 20,
      },
      tests: {
        type: Number,
        default: 30,
      },
      finalExam: {
        type: Number,
        default: 20,
      },
    },
    learningObjectives: [
      {
        objective: String,
        description: String,
        skills: [String], // Skills to be developed
      },
    ],
    resources: [
      {
        title: String,
        type: {
          type: String,
          enum: [
            "Textbook",
            "Workbook",
            "Digital Resource",
            "Video",
            "Website",
            "Software",
            "Other",
          ],
        },
        url: String,
        description: String,
        isRequired: {
          type: Boolean,
          default: false,
        },
      },
    ],
    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],
    exams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],
    attendancePolicy: {
      requiredAttendance: {
        type: Number,
        default: 90, // Required attendance percentage
      },
      tardyPolicy: String,
      makeupPolicy: String,
    },
    behaviorPolicy: {
      classroomRules: [String],
      disciplinaryActions: [String],
    },
    parentCommunication: {
      progressReports: {
        frequency: {
          type: String,
          enum: ["Weekly", "Bi-weekly", "Monthly", "Quarterly"],
          default: "Monthly",
        },
      },
      parentConferences: {
        scheduled: [Date],
        notes: String,
      },
    },
    specialNeeds: {
      accommodations: [String], // IEP/504 accommodations
      modifications: [String],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // Admin who created the course
      required: true,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for enrollment percentage
courseSchema.virtual("enrollmentPercentage").get(function () {
  return (this.currentEnrollment / this.classSize) * 100;
});

// Virtual for available seats
courseSchema.virtual("availableSeats").get(function () {
  return this.classSize - this.currentEnrollment;
});

// Virtual for full course name
courseSchema.virtual("fullCourseName").get(function () {
  return `${this.subject} - ${this.grade}`;
});

// Virtual for assessment total
courseSchema.virtual("assessmentTotal").get(function () {
  const weights = this.assessmentWeights;
  return (
    weights.homework +
    weights.classParticipation +
    weights.quizzes +
    weights.tests +
    weights.finalExam
  );
});

// Index for better performance
courseSchema.index({ courseCode: 1 });
courseSchema.index({ subject: 1, grade: 1 });
courseSchema.index({ academicYear: 1, status: 1 });
courseSchema.index({ teacher: 1 });
courseSchema.index({ level: 1, grade: 1 });

// Pre-save middleware to update enrollment count
courseSchema.pre("save", function (next) {
  if (this.enrolledStudents) {
    this.currentEnrollment = this.enrolledStudents.filter(
      (enrollment) => enrollment.status === "Active"
    ).length;
  }
  this.lastModified = new Date();
  next();
});

// Validation for assessment weights
courseSchema.pre("save", function (next) {
  const total = this.assessmentTotal;
  if (total !== 100) {
    return next(new Error("Assessment weights must total 100%"));
  }
  next();
});

module.exports = mongoose.model("Course", courseSchema);