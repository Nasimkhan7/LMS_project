'use client';
import React from "react";
import { Bar } from "react-chartjs-2";

export default function ExamResults({ examResults, handlePrint }) {
  const examResultsData = {
    labels: examResults.map((result) => result.subject),
    datasets: [
      {
        label: "Marks",
        data: examResults.map((result) => result.marks),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div id="print-section" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Exam Results</h1>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">Subject</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">Marks</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">Grade</th>
            </tr>
          </thead>
          <tbody>
            {examResults.map((result) => (
              <tr key={result.subject}>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">{result.subject}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">{result.marks}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                  {result.marks >= 90
                    ? "A+"
                    : result.marks >= 80
                    ? "A"
                    : result.marks >= 70
                    ? "B"
                    : result.marks >= 60
                    ? "C"
                    : "D"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overall Performance */}
      <div className="mt-6 text-gray-700 dark:text-gray-200">
        <p><strong>Total Marks:</strong> {examResults.reduce((acc, result) => acc + result.marks, 0)}</p>
        <p><strong>Average Marks:</strong> {(examResults.reduce((acc, result) => acc + result.marks, 0) / examResults.length).toFixed(2)}</p>
      </div>

      {/* Print Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Print Result
        </button>
      </div>
    </div>
  );
}