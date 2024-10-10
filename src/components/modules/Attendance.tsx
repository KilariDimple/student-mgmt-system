import React, { useState } from 'react';

interface AttendanceProps {
  userType: 'student' | 'mentor' | null;
}

const Attendance: React.FC<AttendanceProps> = ({ userType }) => {
  const [attendance, setAttendance] = useState([
    { date: '2023-05-01', status: 'Present' },
    { date: '2023-05-02', status: 'Present' },
    { date: '2023-05-03', status: 'Absent' },
    { date: '2023-05-04', status: 'Present' },
    { date: '2023-05-05', status: 'Present' },
  ]);

  const [newAttendance, setNewAttendance] = useState({ date: '', status: 'Present' });

  const handleAddAttendance = () => {
    if (newAttendance.date) {
      setAttendance([...attendance, newAttendance]);
      setNewAttendance({ date: '', status: 'Present' });
    }
  };

  const calculateAttendancePercentage = () => {
    const totalDays = attendance.length;
    const presentDays = attendance.filter((a) => a.status === 'Present').length;
    return ((presentDays / totalDays) * 100).toFixed(2);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Attendance Record</h3>
      <div className="mb-4">
        <p className="text-lg">
          Attendance Percentage: <span className="font-bold">{calculateAttendancePercentage()}%</span>
        </p>
      </div>
      <table className="w-full mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{record.date}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded ${
                    record.status === 'Present' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}
                >
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userType === 'mentor' && (
        <div>
          <h4 className="text-lg font-semibold mb-2">Add New Attendance Record</h4>
          <div className="flex space-x-2 mb-4">
            <input
              type="date"
              value={newAttendance.date}
              onChange={(e) => setNewAttendance({ ...newAttendance, date: e.target.value })}
              className="border p-2 rounded flex-1"
            />
            <select
              value={newAttendance.status}
              onChange={(e) => setNewAttendance({ ...newAttendance, status: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
            <button
              onClick={handleAddAttendance}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;