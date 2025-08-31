'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageStudentPage() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch students from your API
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        if (res.ok) {
          const data = await res.json();
          setStudents(data);
        } else {
          setError("Failed to fetch students.");
        }
      } catch {
        setError("Network error.");
      }
    };
    fetchStudents();
  }, []);

  const handleAddStudent = () => {
    router.push("/admin/register-student");
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center">Manage Students</h2>
        <button
          onClick={handleAddStudent}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Student
        </button>
      </div>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Photo</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Class</th>
              <th className="py-2 px-4 border-b">Class Timing</th>
              <th className="py-2 px-4 border-b">Grade</th>
              <th className="py-2 px-4 border-b">Parent</th>
              <th className="py-2 px-4 border-b">Contact</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">
                    {student.photoUrl ? (
                      <img
                        src={student.photoUrl}
                        alt="Student"
                        className="w-12 h-16 object-cover rounded border mx-auto"
                        style={{ aspectRatio: "3/4" }}
                      />
                    ) : (
                      <span className="text-gray-400">No Photo</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{student.firstName} {student.lastName}</td>
                  <td className="py-2 px-4 border-b">{student.className}</td>
                  <td className="py-2 px-4 border-b">{student.classTiming || <span className="text-gray-400">-</span>}</td>
                  <td className="py-2 px-4 border-b">{student.grade}</td>
                  <td className="py-2 px-4 border-b">{student.parentName}</td>
                  <td className="py-2 px-4 border-b">{student.parentContact}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition">
                      Edit
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}