'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageTeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch teachers from your API
    const fetchTeachers = async () => {
      try {
        const res = await fetch("/api/teachers");
        if (res.ok) {
          const data = await res.json();
          setTeachers(data);
        } else {
          setError("Failed to fetch teachers.");
        }
      } catch {
        setError("Network error.");
      }
    };
    fetchTeachers();
  }, []);

  const handleAddTeacher = () => {
    router.push("/admin/register-teacher");
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center">Manage Teachers</h2>
        <button
          onClick={handleAddTeacher}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Teacher
        </button>
      </div>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Photo</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Subject</th>
              <th className="py-2 px-4 border-b">Class</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No teachers found.
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">
                    {teacher.photoUrl ? (
                      <img
                        src={teacher.photoUrl}
                        alt="Teacher"
                        className="w-12 h-12 object-cover rounded-full border mx-auto"
                      />
                    ) : (
                      <span className="text-gray-400">No Photo</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{teacher.name}</td>
                  <td className="py-2 px-4 border-b">{teacher.email}</td>
                  <td className="py-2 px-4 border-b">{teacher.phone}</td>
                  <td className="py-2 px-4 border-b">{teacher.subject}</td>
                  <td className="py-2 px-4 border-b">
                    {teacher.className || (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
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