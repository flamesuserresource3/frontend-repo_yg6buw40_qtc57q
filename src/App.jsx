import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import AttendanceForm from './components/AttendanceForm';
import StudentList from './components/StudentList';
import AttendanceSummary from './components/AttendanceSummary';

function isoDateString(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const tzOffset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - tzOffset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

export default function App() {
  const [students, setStudents] = useState([]);
  // attendance: { [dateISO]: { [studentId]: boolean } }
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(() => isoDateString(new Date()));
  const [search, setSearch] = useState('');

  const addStudent = ({ name, roll }) => {
    const id = crypto.randomUUID();
    setStudents((prev) => [...prev, { id, name, roll }].sort((a, b) => a.roll.localeCompare(b.roll)));
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setAttendance((prev) => {
      const copy = { ...prev };
      for (const d of Object.keys(copy)) {
        if (copy[d] && id in copy[d]) delete copy[d][id];
      }
      return copy;
    });
  };

  const toggleAttendance = (studentId, isPresent) => {
    const key = selectedDate;
    setAttendance((prev) => ({
      ...prev,
      [key]: { ...(prev[key] || {}), [studentId]: isPresent },
    }));
  };

  const markAll = (date, present) => {
    setAttendance((prev) => ({
      ...prev,
      [date]: Object.fromEntries(students.map((s) => [s.id, present])),
    }));
  };

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q)
    );
  }, [students, search]);

  const attendanceForDate = attendance[selectedDate] || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <Header selectedDate={selectedDate} onToday={() => setSelectedDate(isoDateString(new Date()))} />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm text-gray-600">Search Students</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or roll number"
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </section>

        <AttendanceForm
          onAddStudent={addStudent}
          selectedDate={selectedDate}
          onMarkAll={markAll}
        />

        <AttendanceSummary
          students={students}
          attendanceForDate={attendanceForDate}
        />

        <StudentList
          students={filteredStudents}
          attendanceForDate={attendanceForDate}
          onToggle={(id, present) => toggleAttendance(id, present)}
          onRemove={removeStudent}
        />
      </main>

      <footer className="max-w-6xl mx-auto px-4 pb-10 pt-2 text-center text-xs text-gray-500">
        Local-only demo. Connect to your backend API to persist data.
      </footer>
    </div>
  );
}
