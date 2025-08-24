const mongoose = require("../connection");

// Course Schema
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Course Name (e.g., "Full Stack Development")
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String, // e.g., "Science", "Mathematics", "Programming"
      default: "General",
    },
    // classId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Class", // किस Class में यह Course है (optional)
    // },
    // subjects: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Subject", // Course → Subjects
    //   },
    // ],
    // chapters: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Chapter", // Course → Chapters
    //   },
    // ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher", // किस Teacher/Admin ने यह Course बनाया
      required: true,
    },
    duration: {
      type: String, // e.g., "3 Months", "1 Year"
      default: "Self-paced",
    },
    price: {
      type: Number, // अगर Course Paid है
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);