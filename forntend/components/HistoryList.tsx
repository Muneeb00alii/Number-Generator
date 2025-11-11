'use client';

import { NumberEntry } from '@/types';

interface HistoryListProps {
    history: NumberEntry[];
}

export default function HistoryList({ history }: HistoryListProps) {
    if (history.length === 0) {
        return (
            <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-xl font-semibold mb-4">History</h3>
                <p className="text-gray-500 text-center">No numbers generated yet</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-semibold mb-4">History (Last 10)</h3>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Number</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Generated At</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {history.map((entry) => (
                            <tr key={entry.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-600">{entry.id}</td>
                                <td className="px-4 py-3 text-sm font-semibold text-blue-600">{entry.number}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {new Date(entry.created_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}