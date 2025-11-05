import React from 'react';
import { PieChart } from 'lucide-react';

export default function AttendanceSummary({ students, attendanceForDate }) {
  const total = students.length;
  const present = Object.values(attendanceForDate || {}).filter((v) => v === true).length;
  const absent = Object.values(attendanceForDate || {}).filter((v) => v === false).length;
  const marked = present + absent;
  const rate = total ? Math.round((present / total) * 100) : 0;

  return (
    <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <PieChart size={20} className="text-indigo-600" /> Attendance Summary
        </h2>
        <span className="text-sm text-gray-500">Marked: {marked}/{total}</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
          <p className="text-xs text-indigo-700">Total Students</p>
          <p className="text-2xl font-semibold text-indigo-900">{total}</p>
        </div>
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
          <p className="text-xs text-emerald-700">Present</p>
          <p className="text-2xl font-semibold text-emerald-900">{present}</p>
        </div>
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-100">
          <p className="text-xs text-rose-700">Absent</p>
          <p className="text-2xl font-semibold text-rose-900">{absent}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
          <div
            className="h-3 bg-emerald-500"
            style={{ width: `${rate}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">Attendance Rate: <span className="font-medium text-gray-900">{rate}%</span></p>
      </div>
    </section>
  );
}
