import React from 'react';
import { Trash2, CheckCircle2, XCircle } from 'lucide-react';

export default function StudentList({ students, attendanceForDate, onToggle, onRemove }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Class Roster</h2>
        <p className="text-sm text-gray-500">{students.length} students</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left font-medium px-4 py-3">Roll</th>
              <th className="text-left font-medium px-4 py-3">Name</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
              <th className="text-right font-medium px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No students yet. Add some above.</td>
              </tr>
            ) : (
              students.map((s) => {
                const present = attendanceForDate?.[s.id];
                return (
                  <tr key={s.id} className="border-t hover:bg-gray-50/70">
                    <td className="px-4 py-3 font-medium">{s.roll}</td>
                    <td className="px-4 py-3">{s.name}</td>
                    <td className="px-4 py-3">
                      <div className="inline-flex items-center gap-2">
                        {present === true && (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                            <CheckCircle2 size={16} /> Present
                          </span>
                        )}
                        {present === false && (
                          <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
                            <XCircle size={16} /> Absent
                          </span>
                        )}
                        {present == null && (
                          <span className="text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onToggle(s.id, true)}
                          className={`px-3 py-1.5 text-xs rounded-md border ${present === true ? 'bg-emerald-600 text-white border-emerald-600' : 'hover:bg-emerald-50 border-emerald-200 text-emerald-700'}`}
                        >
                          Mark Present
                        </button>
                        <button
                          onClick={() => onToggle(s.id, false)}
                          className={`px-3 py-1.5 text-xs rounded-md border ${present === false ? 'bg-rose-600 text-white border-rose-600' : 'hover:bg-rose-50 border-rose-200 text-rose-700'}`}
                        >
                          Mark Absent
                        </button>
                        <button
                          onClick={() => onRemove(s.id)}
                          className="ml-2 p-2 rounded-md hover:bg-gray-100 text-gray-500"
                          title="Remove student"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
