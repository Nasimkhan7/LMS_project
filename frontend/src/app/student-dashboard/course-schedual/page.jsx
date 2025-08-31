'use client';
import React, { useState } from "react";

// Dummy course schedule data
const courseSchedule = [
  {
    day: "Monday",
    time: "10:00 AM - 11:00 AM",
    subject: "Mathematics",
    teacher: "Mr. Sharma",
  },
  {
    day: "Monday",
    time: "11:15 AM - 12:15 PM",
    subject: "Science",
    teacher: "Ms. Gupta",
  },
  {
    day: "Tuesday",
    time: "10:00 AM - 11:00 AM",
    subject: "English",
    teacher: "Mrs. Verma",
  },
  {
    day: "Wednesday",
    time: "09:00 AM - 10:00 AM",
    subject: "Social Studies",
    teacher: "Mr. Singh",
  },
  // ...add more schedule items as needed
];

// Dummy student info
const student = {
  name: "Rahul Kumar",
  photoUrl: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with actual photo URL
};

export default function CourseSchedulePage() {
  const [selectedDay, setSelectedDay] = useState("All");

  const days = ["All", ...Array.from(new Set(courseSchedule.map(cs => cs.day)))];

  const filteredSchedule =
    selectedDay === "All"
      ? courseSchedule
      : courseSchedule.filter(cs => cs.day === selectedDay);

  return (
    <div>
      {/* Navbar with student name and photo */}
      <nav className="bg-blue-600 px-6 py-4 flex items-center justify-between rounded-b-xl shadow">
        <div className="flex items-center gap-3">
          <img
            src={student.photoUrl}
            alt={student.name}
            className="w-10 h-10 rounded-full border-2 border-white shadow"
          />
          <span className="text-white font-semibold text-lg">{student.name}</span>
        </div>
        <span className="text-blue-100 font-bold text-xl">Course Schedule</span>
      </nav>
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Course Schedule</h2>
        <div className="mb-6 flex justify-center gap-2">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded font-semibold transition ${
                selectedDay === day
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <table className="min-w-full border border-gray-300 rounded-lg mb-4">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Day</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Subject</th>
              <th className="py-2 px-4 border-b">Class Teacher</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedule.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No schedule available.
                </td>
              </tr>
            ) : (
              filteredSchedule.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{item.day}</td>
                  <td className="py-2 px-4 border-b">{item.time}</td>
                  <td className="py-2 px-4 border-b">{item.subject}</td>
                  <td className="py-2 px-4 border-b">{item.teacher}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

}