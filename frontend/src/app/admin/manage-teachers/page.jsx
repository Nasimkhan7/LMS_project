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
    router.push("/admin/manage-teachers/register-teacher");
  };

  const handleEditTeacher = (teacher) => {
    router.push(`/admin/edit-teacher/${teacher._id}`);
  };

  const handleViewProfile = (teacher) => {
    router.push(`/admin/teacher-profile/${teacher._id}`);
  };

  const handleDeleteTeacher = async (id) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      try {
        const res = await fetch(`/api/teachers/${id}`, { method: "DELETE" });
        if (res.ok) {
          setTeachers((prev) => prev.filter((teacher) => teacher._id !== id));
        } else {
          alert("Failed to delete teacher.");
        }
      } catch {
        alert("Network error.");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">
          Manage Teachers
        </h1>
        <button
          onClick={handleAddTeacher}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Teacher
        </button>
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-3 border-b dark:border-gray-700">Name</th>
              <th className="py-2 px-3 border-b dark:border-gray-700">Email</th>
              <th className="py-2 px-3 border-b dark:border-gray-700">Phone</th>
              <th className="py-2 px-3 border-b dark:border-gray-700">Subjects</th>
              <th className="py-2 px-3 border-b dark:border-gray-700">Classes</th>
              <th className="py-2 px-3 border-b dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No teachers found.
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher._id} className="hover:bg-gray-100">
                  <td className="py-2 px-3 border-b">{teacher.name}</td>
                  <td className="py-2 px-3 border-b">{teacher.email}</td>
                  <td className="py-2 px-3 border-b">{teacher.phone}</td>
                  <td className="py-2 px-3 border-b">
                    {teacher.subjects.join(", ")}
                  </td>
                  <td className="py-2 px-3 border-b">
                    {teacher.classes.join(", ")}
                  </td>
                  <td className="py-2 px-3 border-b text-center">
                    <button
                      onClick={() => handleEditTeacher(teacher)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTeacher(teacher._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleViewProfile(teacher)}
                      className="bg-green-500 text-white px-3 py-1 rounded ml-2 hover:bg-green-600 transition"
                    >
                      View Profile
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