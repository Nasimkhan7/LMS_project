'use client';
import React, { useState } from "react";

const initialCourses = [
  {
    id: 1,
    code: "CS101",
    title: "Introduction to Computer Science",
    description: "Learn the basics of computer science.",
    category: "Technology",
    prerequisites: "None",
    instructors: ["John Doe"],
    lessons: [
      { id: 1, title: "Lesson 1: Basics of Computers", resources: ["PDF", "Video"] },
      { id: 2, title: "Lesson 2: Programming Basics", resources: ["PPT"] },
    ],
  },
];

const categories = ["Technology", "Science", "Mathematics", "Arts"];
const teachers = ["John Doe", "Jane Smith", "Alice Johnson"];

export default function ManageCoursePage() {
  const [courses, setCourses] = useState(initialCourses);
  const [form, setForm] = useState({
    code: "",
    title: "",
    description: "",
    category: categories[0],
    prerequisites: "",
    instructors: [],
    lessons: [],
  });
  const [editId, setEditId] = useState(null);
  const [lessonForm, setLessonForm] = useState({ title: "", resources: [] });
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleLessonChange = (e) => {
    const { name, value } = e.target;
    setLessonForm((f) => ({ ...f, [name]: value }));
  };

  const handleAddLesson = () => {
    if (!lessonForm.title.trim()) return;
    setForm((f) => ({
      ...f,
      lessons: [...f.lessons, { id: Date.now(), ...lessonForm }],
    }));
    setLessonForm({ title: "", resources: [] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.code.trim() || !form.title.trim()) return;
    if (editId) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editId ? { ...c, ...form } : c
        )
      );
    } else {
      setCourses((prev) => [
        ...prev,
        { id: Date.now(), ...form },
      ]);
    }
    setForm({
      code: "",
      title: "",
      description: "",
      category: categories[0],
      prerequisites: "",
      instructors: [],
      lessons: [],
    });
    setEditId(null);
  };

  const handleEdit = (course) => {
    setForm(course);
    setEditId(course.id);
  };

  const handleDelete = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({
        code: "",
        title: "",
        description: "",
        category: categories[0],
        prerequisites: "",
        instructors: [],
        lessons: [],
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Manage Courses</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block mb-1 font-semibold">Course Code</label>
          <input
            type="text"
            name="code"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.code}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Course Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.description}
            onChange={handleChange}
            rows={2}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="category"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Prerequisites</label>
          <input
            type="text"
            name="prerequisites"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.prerequisites}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Instructors</label>
          <select
            name="instructors"
            multiple
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={form.instructors}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                instructors: Array.from(e.target.selectedOptions, (option) => option.value),
              }))
            }
          >
            {teachers.map((teacher) => (
              <option key={teacher} value={teacher}>{teacher}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Lessons</label>
          <div className="flex gap-4">
            <input
              type="text"
              name="title"
              placeholder="Lesson Title"
              className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={lessonForm.title}
              onChange={handleLessonChange}
            />
            <input
              type="file"
              name="resources"
              multiple
              onChange={(e) =>
                setLessonForm((f) => ({
                  ...f,
                  resources: Array.from(e.target.files).map((file) => file.name),
                }))
              }
            />
            <button
              type="button"
              onClick={handleAddLesson}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add Lesson
            </button>
          </div>
          <ul className="mt-2 space-y-2">
            {form.lessons.map((lesson) => (
              <li key={lesson.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <span>{lesson.title}</span>
                <button
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      lessons: f.lessons.filter((l) => l.id !== lesson.id),
                    }))
                  }
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className={`px-6 py-2 rounded font-semibold text-white transition ${
              editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editId ? "Update Course" : "Add Course"}
          </button>
        </div>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-4">All Courses</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title or category..."
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
            <thead>
              <tr>
                <th className="py-2 px-3 border-b dark:border-gray-700">Code</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Title</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Category</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Instructors</th>
                <th className="py-2 px-3 border-b dark:border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="text-center">
                  <td className="py-2 px-3 border-b dark:border-gray-700">{course.code}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">{course.title}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">{course.category}</td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">
                    {course.instructors.join(", ")}
                  </td>
                  <td className="py-2 px-3 border-b dark:border-gray-700">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(course)}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-gray-400">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}