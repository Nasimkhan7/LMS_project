'use client';
import React, { useState } from "react";

export default function ManageStudentsPage() {
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Sharma", class: "Class 6", email: "rahul@example.com" },
    { id: 2, name: "Priya Singh", class: "Class 7", email: "priya@example.com" },
  ]);

  const handleAddStudent = () => {
    // Logic to add a new student
    alert("Add Student functionality coming soon!");
  };

  const handleEditStudent = (id) => {
    // Logic to edit a student
    alert(`Edit Student with ID: ${id}`);
  };

  const handleDeleteStudent = (id) => {
    // Logic to delete a student
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Manage Students</h1>
      <button
        onClick={handleAddStudent}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add Student
      </button>
      <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-3 border-b dark:border-gray-700">Name</th>
            <th className="py-2 px-3 border-b dark:border-gray-700">Class</th>
            <th className="py-2 px-3 border-b dark:border-gray-700">Email</th>
            <th className="py-2 px-3 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="py-2 px-3 border-b dark:border-gray-700">{student.name}</td>
              <td className="py-2 px-3 border-b dark:border-gray-700">{student.class}</td>
              <td className="py-2 px-3 border-b dark:border-gray-700">{student.email}</td>
              <td className="py-2 px-3 border-b dark:border-gray-700">
                <button
                  onClick={() => handleEditStudent(student.id)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}