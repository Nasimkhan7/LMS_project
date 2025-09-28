'use client';
import React, { useState } from "react";

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState([
    { id: 1, title: "Mathematics", description: "Learn the basics of Mathematics." },
    { id: 2, title: "Science", description: "Explore the world of Science." },
  ]);

  const handleAddCourse = () => {
    // Logic to add a new course
    alert("Add Course functionality coming soon!");
  };

  const handleEditCourse = (id) => {
    // Logic to edit a course
    alert(`Edit Course with ID: ${id}`);
  };

  const handleDeleteCourse = (id) => {
    // Logic to delete a course
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Manage Courses</h1>
      <button
        onClick={handleAddCourse}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add Course
      </button>
      <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-3 border-b dark:border-gray-700">Title</th>
            <th className="py-2 px-3 border-b dark:border-gray-700">Description</th>
            <th className="py-2 px-3 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="py-2 px-3 border-b dark:border-gray-700">{course.title}</td>
              <td className="py-2 px-3 border-b dark:border-gray-700">{course.description}</td>
              <td className="py-2 px-3 border-b dark:border-gray-700">
                <button
                  onClick={() => handleEditCourse(course.id)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
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