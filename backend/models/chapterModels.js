const mongoose = require("mongoose");

// Chapter Schema
const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Chapter name (e.g., "Introduction to Algebra")
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject", // Chapter belongs to a Subject
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class", // Optional: Link Chapter to Class also
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher", // Teacher/Admin who created this chapter
    },
    resources: [
      {
        type: {
          type: String,
          enum: ["pdf", "video", "link", "doc"], // Type of resource
        },
        url: String,
        title: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);