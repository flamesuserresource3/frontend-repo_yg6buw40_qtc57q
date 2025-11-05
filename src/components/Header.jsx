import React from 'react';
import { School, CalendarDays } from 'lucide-react';

export default function Header({ selectedDate, onToday }) {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md">
            <School size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Student Attendance</h1>
            <p className="text-sm text-gray-500">Track daily attendance quickly and clearly</p>
          </div>
        </div>
        <button
          onClick={onToday}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50"
        >
          <CalendarDays size={18} />
          Today: {new Date(selectedDate).toLocaleDateString()}
        </button>
      </div>
    </header>
  );
}
