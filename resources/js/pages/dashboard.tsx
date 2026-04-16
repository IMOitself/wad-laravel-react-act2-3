import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Dashboard() {
    const [currentView, setCurrentView] = useState('index');

    // dummy data :D
    const students = [
        { id: 1, student_id: '12345', name: 'John Doe', course: 'BSIS', year: '3' }
    ];

    return (
        // every pages from https://github.com/LVCCWAD/student-ms 
        // each bootstrap is converted to tailwind :D
        // converted to dark mode!
        <div className="container mx-auto mt-12 mb-12 max-w-5xl px-4 text-gray-200">
            <Head title="Dashboard" />

            {currentView === 'index' && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-white">Students List</h1>
                        <button
                            onClick={() => setCurrentView('create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
                        >
                            Add New Student
                        </button>
                    </div>

                    <div className="bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Student ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Course</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Year</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-700">
                                    {students.map(s => (
                                        <tr key={s.id} className="">
                                            <td className="px-6 py-4 whitespace-nowrap">{s.student_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{s.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{s.course}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{s.year}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={() => setCurrentView('show')} className="text-teal-400 hover:text-teal-300 mr-4">View</button>
                                                <button onClick={() => setCurrentView('edit')} className="text-yellow-400 hover:text-yellow-300 mr-4">Edit</button>
                                                <button className="text-red-400 hover:text-red-300">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {currentView === 'create' && (
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gray-800 shadow rounded-lg border border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-700 bg-gray-700">
                            <h3 className="text-xl font-bold text-white">Add New Student</h3>
                        </div>
                        <div className="p-6">
                            <form className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Student ID</label>
                                    <input type="text" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                    <input type="text" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Course</label>
                                    <select className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                                        <option value="">Select Course</option>
                                        <option value="BSIS">BSIS</option>
                                        <option value="BAB">BAB</option>
                                        <option value="BSAIS">BSAIS</option>
                                        <option value="BSSW">BSSW</option>
                                        <option value="BSA">BSA</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
                                    <select className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                                        <option value="">Select Year</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="flex justify-between pt-4 pb-2 mt-6">
                                    <button type="button" onClick={() => setCurrentView('index')} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Cancel</button>
                                    <button type="button" onClick={() => setCurrentView('index')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Create Student</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {currentView === 'edit' && (
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gray-800 shadow rounded-lg border border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-700 bg-gray-700">
                            <h3 className="text-xl font-bold text-white">Edit Student</h3>
                        </div>
                        <div className="p-6">
                            <form className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Student ID</label>
                                    <input type="text" defaultValue="12345" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                    <input type="text" defaultValue="John Doe" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Course</label>
                                    <select defaultValue="BSIS" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                                        <option value="">Select Course</option>
                                        <option value="BSIS">BSIS</option>
                                        <option value="BAB">BAB</option>
                                        <option value="BSAIS">BSAIS</option>
                                        <option value="BSSW">BSSW</option>
                                        <option value="BSA">BSA</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
                                    <select defaultValue="3" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                                        <option value="">Select Year</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="flex justify-between pt-4 pb-2 mt-6">
                                    <button type="button" onClick={() => setCurrentView('index')} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Cancel</button>
                                    <button type="button" onClick={() => setCurrentView('index')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Update Student</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {currentView === 'show' && (
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gray-800 shadow rounded-lg border border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-700 bg-gray-700">
                            <h3 className="text-xl font-bold text-white">Student Details</h3>
                        </div>
                        <div className="p-6">
                            <div className="border border-gray-700 rounded-lg overflow-hidden">
                                <table className="min-w-full">
                                    <tbody className="divide-y divide-gray-700">
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300 w-1/3">Student ID</th><td className="px-6 py-4 text-gray-200">12345</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Name</th><td className="px-6 py-4 text-gray-200">John Doe</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Course</th><td className="px-6 py-4 text-gray-200">BSIS</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Year</th><td className="px-6 py-4 text-gray-200">3</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Created At</th><td className="px-6 py-4 text-gray-200">Apr 16, 2026 12:00 PM</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Updated At</th><td className="px-6 py-4 text-gray-200">Apr 16, 2026 12:00 PM</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between mt-6">
                                <button onClick={() => setCurrentView('index')} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Back to List</button>
                                <div className="space-x-3">
                                    <button onClick={() => setCurrentView('edit')} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Edit</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

