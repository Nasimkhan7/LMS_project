'use client';
import React, { useEffect, useState } from "react";

// Dummy notice data
const notices = [
  {
    title: "Holiday Notice",
    date: "2025-08-30",
    description: "School will remain closed on 31st August due to festival.",
  },
  {
    title: "Exam Schedule",
    date: "2025-09-05",
    description: "Mid-term exams will start from 10th September.",
  },
  {
    title: "Parent Meeting",
    date: "2025-09-12",
    description: "Parent-teacher meeting scheduled for 15th September.",
  },
  // ...add more notices as needed
];

// Dummy student info
const student = {
  name: "Rahul Kumar",
  photoUrl: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with actual photo URL
};

export default function StudentNoticeBoard() {
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    // Replace with API call if needed
    setNoticeList(notices);
  }, []);

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
        <span className="text-blue-100 font-bold text-xl">Notice Board</span>
      </nav>
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Student Notice Board</h2>
        <ul className="space-y-4">
          {noticeList.length === 0 ? (
            <li className="text-center text-gray-500">No notices available.</li>
          ) : (
            noticeList.map((notice, idx) => (
              <li key={idx} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-blue-700">{notice.title}</span>
                  <span className="text-sm text-gray-500">{notice.date}</span>
                </div>
                <div className="text-gray-700">{notice.description}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}