"use client";
import { useEffect, useState } from "react";

export default function StudentDashboard({ params }) {
  const [data, setData] = useState(null);

  const fetchStudent = async () => {
    const res = await fetch(`/api/student/${params.id}`);
    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const markAttendance = async (status) => {
    await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: params.id, status }),
    });
    fetchStudent();
  };

  if (!data) return <p className="p-6">Loading...</p>;

  const { student, attendance } = data;
  const total = attendance.length;
  const present = attendance.filter((a) => a.status === "Present").length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      {/* Student Card */}
      <div className="flex items-center gap-4 bg-white p-4 shadow rounded-xl">
        <img
          src={student.photoUrl}
          alt="profile"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-xl font-bold">{student.name}</h2>
          <p>Roll No: {student.rollNo}</p>
          <p className="text-sm text-gray-600">Attendance: {percentage}%</p>
        </div>
      </div>

      {/* Subjects */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Subjects & Teachers</h3>
        <div className="grid gap-2">
          {student.subjects.map((sub, i) => (
            <div
              key={i}
              className="p-3 bg-blue-50 rounded-lg flex justify-between"
            >
              <span>{sub.name}</span>
              <span className="text-sm text-gray-600">By {sub.teacher}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Records */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Attendance Records</h3>
        <div className="grid gap-2">
          {attendance.map((a) => (
            <div
              key={a._id}
              className="flex justify-between p-3 bg-gray-100 rounded-lg"
            >
              <span>{new Date(a.date).toLocaleDateString()}</span>
              <span
                className={
                  a.status === "Present" ? "text-green-600" : "text-red-600"
                }
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => markAttendance("Present")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          ✅ Mark Present
        </button>
        <button
          onClick={() => markAttendance("Absent")}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          ❌ Mark Absent
        </button>
      </div>
    </div>
  );
}