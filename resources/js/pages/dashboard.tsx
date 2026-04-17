import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Dashboard({ entries = [] }: { entries?: any[] }) {
    const [currentView, setCurrentView] = useState('index');
    const [selectedEntry, setSelectedEntry] = useState<any>(null);

    const { data, setData, post, put, delete: destroy, reset } = useForm({
        name: '',
        price: '',
        date: '',
        category: '',
        note: '',
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/entries', {
            onSuccess: () => {
                reset();
                setCurrentView('index');
            }
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedEntry && selectedEntry.id) {
            put(`/dashboard/entries/${selectedEntry.id}`, {
            onSuccess: () => {
                reset();
                setSelectedEntry(null);
                setCurrentView('index');
            }
        });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this entry?")) {
            destroy(`/dashboard/entries/${id}`);
        }
    };

    const openCreate = () => {
        reset();
        setCurrentView('create');
    };

    const openEdit = (entry: any) => {
        setSelectedEntry(entry);
        setData({
            name: entry.name || '',
            price: entry.price || '',
            date: entry.date || '',
            category: entry.categories || '',
            note: entry.note || '',
        });
        setCurrentView('edit');
    };

    const openShow = (entry: any) => {
        setSelectedEntry(entry);
        setCurrentView('show');
    };

    return (
        <div className="container mx-auto mt-12 mb-12 max-w-5xl px-4 text-gray-200">
            <Head title="Dashboard" />

            {currentView === 'index' && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-white">Budget Tracker</h1>
                        <button
                            onClick={openCreate}
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
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Note</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-700">
                                    {entries.filter(e => e != null).map((entry, idx) => (
                                        <tr key={entry?.id || idx} className="">
                                            <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{entry.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{entry.categories}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{entry.date || (entry.created_at ? new Date(entry.created_at).toLocaleDateString() : '')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{entry.note}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={() => openShow(entry)} className="text-teal-400 hover:text-teal-300 mr-4">View</button>
                                                <button onClick={() => openEdit(entry)} className="text-yellow-400 hover:text-yellow-300 mr-4">Edit</button>
                                                <button onClick={() => entry?.id && handleDelete(entry.id)} className="text-red-400 hover:text-red-300">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {entries.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-center text-gray-400">No entries found.</td>
                                        </tr>
                                    )}
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
                            <form className="space-y-5" onSubmit={handleCreate}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                    <input required type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                                    <input required type="number" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                                    <input type="date" value={data.date} onChange={e => setData('date', e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                    <select value={data.category} onChange={e => setData('category', e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
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
                                    <textarea value={data.note} onChange={e => setData('note', e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" rows={3}></textarea>
                                </div>
                                <div className="flex justify-between pt-4 pb-2 mt-6">
                                    <button type="button" onClick={() => setCurrentView('index')} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Cancel</button>
                                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Create Entry</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {currentView === 'edit' && selectedEntry && (
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gray-800 shadow rounded-lg border border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-700 bg-gray-700">
                            <h3 className="text-xl font-bold text-white">Edit Entry</h3>
                        </div>
                        <div className="p-6">
                            <form className="space-y-5" onSubmit={handleUpdate}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                    <input required type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                                    <input required type="number" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                                    <input type="date" value={data.date} onChange={e => setData('date', e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                    <select value={data.category} onChange={e => setData('category', e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
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
                                    <textarea value={data.note} onChange={e => setData('note', e.target.value)} className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" rows={3}></textarea>
                                </div>
                                <div className="flex justify-between pt-4 pb-2 mt-6">
                                    <button type="button" onClick={() => setCurrentView('index')} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Cancel</button>
                                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Update Entry</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {currentView === 'show' && selectedEntry && (
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gray-800 shadow rounded-lg border border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-700 bg-gray-700">
                            <h3 className="text-xl font-bold text-white">Entry Details</h3>
                        </div>
                        <div className="p-6">
                            <div className="border border-gray-700 rounded-lg overflow-hidden">
                                <table className="min-w-full">
                                    <tbody className="divide-y divide-gray-700">
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300 w-1/3">Name</th><td className="px-6 py-4 text-gray-200">{selectedEntry.name}</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Price</th><td className="px-6 py-4 text-gray-200">₱{selectedEntry.price}</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Date</th><td className="px-6 py-4 text-gray-200">{selectedEntry.date}</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Category</th><td className="px-6 py-4 text-gray-200">{selectedEntry.categories}</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Note</th><td className="px-6 py-4 text-gray-200">{selectedEntry.note}</td></tr>
                                        <tr><th className="px-6 py-4 bg-gray-700 text-left font-semibold text-gray-300">Created At</th><td className="px-6 py-4 text-gray-200">{new Date(selectedEntry.created_at).toLocaleString()}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between mt-6">
                                <button onClick={() => setCurrentView('index')} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Back to List</button>
                                <div className="space-x-3">
                                    <button onClick={() => openEdit(selectedEntry)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Edit</button>
                                    <button onClick={() => selectedEntry?.id && handleDelete(selectedEntry.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded shadow transition-colors">Delete</button>
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
