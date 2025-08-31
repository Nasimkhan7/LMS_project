'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function AddClassModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    className: "",
    topic: "",
    startTime: "",
    password: "",
    section: "",
    date: "",
    timing: "",
    createdBy: "",
    link: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      className: "",
      topic: "",
      startTime: "",
      password: "",
      section: "",
      date: "",
      timing: "",
      createdBy: "",
      link: "",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4 text-center">Add Online Class</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="className" value={form.className} onChange={handleChange} placeholder="Class" required className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" />
          <input name="topic" value={form.topic} onChange={handleChange} placeholder="Topic" required className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" />
          <input name="startTime" value={form.startTime} onChange={handleChange} placeholder="Start Time" required className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" />
          <input name="section" value={form.section} onChange={handleChange} placeholder="Section" className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" />
          <input name="date" type="date" value={form.date} onChange={handleChange} required className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" />
          <input name="timing" value={form.timing} onChange={handleChange} placeholder="Timing" className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" />
          <input name="createdBy" value={form.createdBy} onChange={handleChange} placeholder="Created By" className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" />
          <input name="link" value={form.link} onChange={handleChange} placeholder="Class Link" className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 md:col-span-2" />
          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OnlineClassesPage() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch online classes from your API
    const fetchClasses = async () => {
      try {
        const res = await fetch("/api/online-classes");
        if (res.ok) {
          const data = await res.json();
          setClasses(data);
        } else {
          setError("Failed to fetch online classes.");
        }
      } catch {
        setError("Network error.");
      }
    };
    fetchClasses();
  }, []);

  const handleAddClass = () => {
    setModalOpen(true);
  };

  const handleModalSubmit = async (form) => {
    try {
      const res = await fetch("/api/online-classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newClass = await res.json();
        setClasses((prev) => [...prev, newClass]);
        setModalOpen(false);
      } else {
        setError("Failed to add class.");
      }
    } catch {
      setError("Network error.");
    }
  };

  // Filter classes by search
  const filteredClasses = classes.filter(
    (cls) =>
      cls.className?.toLowerCase().includes(search.toLowerCase()) ||
      cls.topic?.toLowerCase().includes(search.toLowerCase()) ||
      cls.section?.toLowerCase().includes(search.toLowerCase()) ||
      cls.createdBy?.toLowerCase().includes(search.toLowerCase())
  );

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "Class",
      "Topic",
      "Start Time",
      "Password",
      "Section",
      "Date",
      "Timing",
      "Created By",
      "Link"
    ];
    const rows = filteredClasses.map((cls) => [
      cls.className,
      cls.topic,
      cls.startTime,
      cls.password,
      cls.section,
      cls.date,
      cls.timing,
      cls.createdBy,
      cls.link,
    ]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "online_classes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to Excel (simple CSV with .xls extension)
  const handleExportExcel = () => {
    const headers = [
      "Class",
      "Topic",
      "Start Time",
      "Password",
      "Section",
      "Date",
      "Timing",
      "Created By",
      "Link"
    ];
    const rows = filteredClasses.map((cls) => [
      cls.className,
      cls.topic,
      cls.startTime,
      cls.password,
      cls.section,
      cls.date,
      cls.timing,
      cls.createdBy,
      cls.link,
    ]);
    let excelContent =
      "data:application/vnd.ms-excel," +
      [headers, ...rows].map((e) => e.join("\t")).join("\n");
    const encodedUri = encodeURI(excelContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "online_classes.xls");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print table
  const handlePrint = () => {
    const printContent = document.getElementById("online-classes-table").outerHTML;
    const win = window.open("", "", "width=900,height=700");
    win.document.write(`
      <html>
        <head>
          <title>Print Online Classes</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; }
            th { background: #2563eb; color: #fff; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <AddClassModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleModalSubmit} />
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-center">Manage Online Classes</h2>
        <div className="flex gap-2">
          <button
            onClick={handleAddClass}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Class
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportExcel}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
          >
            Export Excel
          </button>
          <button
            onClick={handlePrint}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Print
          </button>
        </div>
      </div>
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by class, topic, section, created by..."
          className="px-3 py-2 border rounded w-full max-w-xs focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table
          id="online-classes-table"
          className="min-w-full border border-gray-300 rounded-lg"
        >
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Class</th>
              <th className="py-2 px-4 border-b">Topic</th>
              <th className="py-2 px-4 border-b">Start Time</th>
              <th className="py-2 px-4 border-b">Password</th>
              <th className="py-2 px-4 border-b">Section</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Timing</th>
              <th className="py-2 px-4 border-b">Created By</th>
              <th className="py-2 px-4 border-b">Link</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-4 text-gray-500">
                  No online classes found.
                </td>
              </tr>
            ) : (
              filteredClasses.map((cls) => (
                <tr key={cls._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{cls.className}</td>
                  <td className="py-2 px-4 border-b">{cls.topic}</td>
                  <td className="py-2 px-4 border-b">{cls.startTime}</td>
                  <td className="py-2 px-4 border-b">{cls.password}</td>
                  <td className="py-2 px-4 border-b">{cls.section}</td>
                  <td className="py-2 px-4 border-b">{cls.date}</td>
                  <td className="py-2 px-4 border-b">{cls.timing}</td>
                  <td className="py-2 px-4 border-b">{cls.createdBy}</td>
                  <td className="py-2 px-4 border-b">
                    {cls.link ? (
                      <a
                        href={cls.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Join
                      </a>
                    ) : (
                      <span className="text-gray-400">No Link</span>
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