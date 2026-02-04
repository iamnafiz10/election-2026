'use client';

import React, { useState } from 'react';
import { Trash2, Menu} from 'lucide-react';
import Link from "next/link";

interface HomePageField {
    id: number;
    name: string;
    birth: string;
    word: string;
    place: string;
}

// Sample data
const sampleData: HomePageField[] = Array.from({ length: 42 }, (_, i) => ({
    id: i + 1,
    name: `Nafiz ${i + 1}`,
    birth: `1990-01-${(i + 1).toString().padStart(2, '0')}`,
    word: `Kamargaon ${i + 1}`,
    place: `Rajshahi ${i + 1}`,
}));

export default function AdminPanel() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(sampleData.length / itemsPerPage);

    const filteredData = sampleData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const toggleRow = (id: number) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === paginatedData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedData.map((item) => item.id));
        }
    };

    return (
        <>
            <div className="flex h-screen w-full">
                {/* Sidebar */}
                <aside
                    className={`bg-white w-64 p-4 space-y-6 absolute md:relative z-20 h-full transition-transform transform ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
                >
                    <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                    <nav>
                        <button className="flex items-center gap-2 px-4 py-2 w-full text-gray-700 rounded hover:bg-gray-200">
                            <Menu size={18} /> Dashboard
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-auto">
                    {/* Top Bar for mobile */}
                    <header className="flex items-center justify-between bg-white p-4 shadow md:hidden">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-bold">Home Page Fields</h1>
                    </header>

                    <main className="flex-1 p-6">
                        <div className="flex flex-col space-y-4">
                            {/* Search & Selected count */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    className="px-4 py-2 border border-blue-500 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div>Selected Rows: {selectedRows.length}</div>
                            </div>

                            <div className="flex justify-end mt-2">
                                <Link href='/admin/add-details'
                                    type="button"
                                    className="py-1 px-6 text-[14px] text-white bg-blue-500 rounded border cursor-pointer"
                                >
                                    Add
                                </Link>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto bg-white shadow rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4"
                                                checked={
                                                    selectedRows.length === paginatedData.length &&
                                                    paginatedData.length > 0
                                                }
                                                onChange={toggleSelectAll}
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ভোটার নাম
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            জন্ম তারিখ
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ওয়ার্ড
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            এলাকা
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedData.map((field) => (
                                        <tr
                                            key={field.id}
                                            className={selectedRows.includes(field.id) ? 'bg-blue-50' : ''}
                                        >
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(field.id)}
                                                    onChange={() => toggleRow(field.id)}
                                                    className="h-4 w-4"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {field.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {field.birth}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {field.word}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {field.place}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex gap-2 justify-end">
                                                <button className="text-red-500 cursor-pointer hover:text-red-700">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {paginatedData.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                                No data found.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-end items-center gap-2 mt-4 flex-wrap">
                                <button
                                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                >
                                    Prev
                                </button>

                                {[...Array(totalPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        className={`px-3 py-1 rounded ${
                                            currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                        }`}
                                        onClick={() => setCurrentPage(idx + 1)}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}

                                <button
                                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
