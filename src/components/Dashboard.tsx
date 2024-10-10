import React, { useState } from 'react';
import { Book, CheckSquare, DollarSign, FileText, Calendar } from 'lucide-react';
import Marks from './modules/Marks';
import Grades from './modules/Grades';
import Attendance from './modules/Attendance';
import FeePayment from './modules/FeePayment';
import LeaveApplication from './modules/LeaveApplication';

interface DashboardProps {
  userType: 'student' | 'mentor' | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  const [activeModule, setActiveModule] = useState('marks');

  const modules = [
    { id: 'marks', name: 'Marks', icon: Book },
    { id: 'grades', name: 'Grades', icon: CheckSquare },
    { id: 'attendance', name: 'Attendance', icon: FileText },
    { id: 'feePayment', name: 'Fee Payment', icon: DollarSign },
    { id: 'leaveApplication', name: 'Leave Application', icon: Calendar },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'marks':
        return <Marks userType={userType} />;
      case 'grades':
        return <Grades userType={userType} />;
      case 'attendance':
        return <Attendance userType={userType} />;
      case 'feePayment':
        return <FeePayment userType={userType} />;
      case 'leaveApplication':
        return <LeaveApplication userType={userType} />;
      default:
        return <div>Select a module</div>;
    }
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-indigo-800 min-h-screen p-4">
        <nav>
          <ul>
            {modules.map((module) => (
              <li key={module.id} className="mb-2">
                <button
                  onClick={() => setActiveModule(module.id)}
                  className={`flex items-center w-full text-left px-4 py-2 rounded transition-colors duration-200 ${
                    activeModule === module.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                  }`}
                >
                  <module.icon className="mr-2 h-5 w-5" />
                  {module.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">
          {modules.find((m) => m.id === activeModule)?.name}
        </h2>
        {renderModule()}
      </main>
    </div>
  );
};

export default Dashboard;