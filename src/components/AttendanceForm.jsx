import React, { useState } from 'react';
import { Plus, UserPlus2 } from 'lucide-react';

export default function AttendanceForm({ onAddStudent, selectedDate, onMarkAll }) {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    const rollTrimmed = roll.trim();
    if (!trimmed || !rollTrimmed) return;
    onAddStudent({ name: trimmed, roll: rollTrimmed });
    setName('');
    setRoll('');
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <UserPlus2 size={20} className="text-indigo-600" /> Add Student
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => onMarkAll(selectedDate, true)}
            className="px-3 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Mark All Present
          </button>
          <button
            onClick={() => onMarkAll(selectedDate, false)}
            className="px-3 py-2 text-sm rounded-md bg-rose-600 text-white hover:bg-rose-700"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-5">
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Priya Sharma"
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="sm:col-span-3">
          <label className="text-sm text-gray-600">Roll No.</label>
          <input
            type="text"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            placeholder="e.g., 21CS042"
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="sm:col-span-4 flex items-end">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
          >
            <Plus size={18} /> Add to Class
          </button>
        </div>
      </form>
    </section>
  );
}
