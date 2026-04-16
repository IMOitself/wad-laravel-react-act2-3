import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Dashboard() {
    const [currentView, setCurrentView] = useState('index');

    // dummy data :D
    const entries = [
        { id: 1, name: 'tokwa', price: '25.00', date: '2026-04-16', categories: 'ulam', note: '' },
        { id: 2, name: 'mantika', price: '35.00', date: '2026-04-16', categories: 'ulam', note: '' }
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
                        <h1 className="text-3xl font-bold text-white">Entries List</h1>
                        <button
                            onClick={() => setCurrentView('create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
                        >
                            Add New Entry
                        </button>
                    </div>

                    <div className="bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Note</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-700">
                                    {entries.map(entry => (
                                        <tr key={entry.id} className="">
                                            <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{entry.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{entry.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{entry.categories}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{entry.note}</td>
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
                            <h3 className="text-xl font-bold text-white">Add New Entry</h3>
                        </div>
                        <div className="p-6">
                            <form className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                    <input type="text" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                                    <input type="number" step="0.01" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                                    <input type="date" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                    <select className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                                        <option value="">Select Category</option>
                                        <option value="Food">Food</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Utilities">Utilities</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Note</label>
                                    <textarea className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" rows={3}></textarea>
                                </div>
                                <div className="flex justify-between pt-4 pb-2 mt-6">
                                    <button type="button" onClick={() => setCurrentView('index')} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Cancel</button>
                                    <button type="button" onClick={() => setCurrentView('index')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Create Entry</button>
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
                            <h3 className="text-xl font-bold text-white">Edit Entry</h3>
                        </div>
                        <div className="p-6">
                            <form className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                    <input type="text" defaultValue="Groceries" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                                    <input type="number" step="0.01" defaultValue="50.00" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                                    <input type="date" defaultValue="2026-04-16" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                    <select defaultValue="Food" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                                        <option value="">Select Category</option>
                                        <option value="Food">Food</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Utilities">Utilities</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Note</label>
                                    <textarea defaultValue="Weekly groceries" className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" rows={3}></textarea>
                                </div>
                                <div className="flex justify-between pt-4 pb-2 mt-6">
                                    <button type="button" onClick={() => setCurrentView('index')} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Cancel</button>
                                    <button type="button" onClick={() => setCurrentView('index')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Update Entry</button>
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
                            <h3 className="text-xl font-bold text-white">Entry Details</h3>
                        </div>
                        <div className="p-6">
                            <div className="border border-gray-700 rounded-lg overflow-hidden">
                                <table className="min-w-full">
                                    <tbody className="divide-y divide-gray-700">
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300 w-1/3">Name</th><td className="px-6 py-4 text-gray-200">Groceries</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Price</th><td className="px-6 py-4 text-gray-200">$50.00</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Date</th><td className="px-6 py-4 text-gray-200">2026-04-16</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Category</th><td className="px-6 py-4 text-gray-200">Food</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Note</th><td className="px-6 py-4 text-gray-200">Weekly groceries</td></tr>
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


