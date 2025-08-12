
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, TrendingUp, TrendingDown, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const HoldingsTable = () => {
    const [holdings, setHoldings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [sectorFilter, setSectorFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    console.log(process.env.NEXT_PUBLIC_API_URL);
    // Fetch data from API
    useEffect(() => {
        const fetchHoldings = async () => {
            try {
                setLoading(true);

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/holdings`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setHoldings(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching holdings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHoldings();
    }, []);

    // Get unique sectors for filter
    const sectors = useMemo(() => {
        const uniqueSectors = [...new Set(holdings.map(holding => holding.sector))];
        return ['All', ...uniqueSectors];
    }, [holdings]);

    // Filter and sort data
    const filteredAndSortedData = useMemo(() => {
        let filtered = holdings.filter(holding => {
            const matchesSearch = holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                holding.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSector = sectorFilter === 'All' || holding.sector === sectorFilter;
            return matchesSearch && matchesSector;
        });

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                // Handle string sorting
                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filtered;
    }, [holdings, searchTerm, sectorFilter, sortConfig]);

    // Paginate data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredAndSortedData.slice(startIndex, endIndex);
    }, [filteredAndSortedData, currentPage, itemsPerPage]);

    // Calculate pagination info
    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
    const startItem = filteredAndSortedData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, filteredAndSortedData.length);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sectorFilter, sortConfig]);

    // Handle sorting
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(amount);
    };

    // Format percentage
    const formatPercentage = (percent) => {
        return `${(percent * 100).toFixed(2)}%`;
    };

    // Get sort icon
    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return <ChevronUp className="w-4 h-4 opacity-30" />;
        }
        return sortConfig.direction === 'asc' ?
            <ChevronUp className="w-4 h-4 text-blue-500" /> :
            <ChevronDown className="w-4 h-4 text-blue-500" />;
    };

    // Loading state
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-3 xl:px-0 lg:px-8 sm:px-6">
                <div className="py-6 border-b border-slate-200">
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Holdings</h1>
                    <p className='text-slate-500 mb-6'> Your holding details</p>

                    {/* Search and Filter Controls (skeleton) */}
                    <div className="bg-white md:p-6 p-4 border border-slate-100 rounded-xl shadow-xs flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <span className="block h-4 w-4 rounded bg-slate-200 animate-pulse" />
                            </div>
                            <div className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md bg-white">
                                <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
                            </div>
                        </div>

                        <div className="sm:w-48">
                            <div className="h-10 rounded-md border border-slate-200 bg-white flex items-center px-3">
                                <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
                            </div>
                        </div>

                        <div className="sm:w-32">
                            <div className="h-10 rounded-md border border-slate-200 bg-white flex items-center px-3">
                                <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
                            </div>
                        </div>


                    </div>

                    {/* Table / items skeleton */}
                    <div className="mt-6 space-y-4">
                        {/* header row skeleton */}
                        <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500 pb-2">
                            <div className="w-2/6 h-4 rounded bg-slate-100 animate-pulse" />
                            <div className="w-1/6 h-4 rounded bg-slate-100 animate-pulse" />
                            <div className="w-1/6 h-4 rounded bg-slate-100 animate-pulse" />
                            <div className="w-1/6 h-4 rounded bg-slate-100 animate-pulse" />
                            <div className="w-1/6 h-4 rounded bg-slate-100 animate-pulse" />
                        </div>

                        {/* rows */}
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 bg-white p-4 border border-slate-100 rounded-xl shadow-sm"
                            >
                                <div className="flex items-center gap-3 w-full sm:w-2/6">
                                    <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse" />
                                    <div className="flex-1">
                                        <div className="h-4 w-40 rounded bg-slate-200 animate-pulse mb-2" />
                                        <div className="h-3 w-28 rounded bg-slate-100 animate-pulse" />
                                    </div>
                                </div>

                                <div className="w-full sm:w-1/6">
                                    <div className="h-4 w-20 rounded bg-slate-200 animate-pulse" />
                                </div>

                                <div className="w-full sm:w-1/6">
                                    <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
                                </div>

                                <div className="w-full sm:w-1/6">
                                    <div className="h-4 w-20 rounded bg-slate-200 animate-pulse" />
                                </div>

                                <div className="w-full sm:w-1/6 flex justify-end">
                                    <div className="h-8 w-20 rounded bg-slate-200 animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-white rounded-lg shadow-sm border border-red-200 p-8">
                <div className="flex items-center justify-center text-red-600">
                    <AlertCircle className="w-8 h-8 mr-3" />
                    <div>
                        <h3 className="font-semibold">Error Loading Data</h3>
                        <p className="text-sm text-red-500 mt-1">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className=" max-w-7xl mx-auto px-3 xl:px-0 lg:px-8 sm:px-6 ">
            {/* Header */}
            <div className="py-6 border-b border-slate-200">
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Holdings</h1>
                <p className='text-slate-500 mb-6'> Your holding details</p>
                {/* Search and Filter Controls */}
                <div className="bg-white md:p-6 p-5 border border-slate-100 rounded-xl shadow-xs flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by symbol or company name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-200 focus:border-blue-300 outline-none"
                        />
                    </div>

                    {/* Sector Filter */}
                    <div className="sm:w-48">
                        <select
                            value={sectorFilter}
                            onChange={(e) => setSectorFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-200 focus:border-blue-300 outline-none bg-white"
                        >
                            {sectors.map(sector => (
                                <option key={sector} value={sector} className="bg-white text-gray-700 hover:bg-blue-100">{sector}</option>
                            ))}
                        </select>
                    </div>

                    {/* Items per page */}
                    <div className="sm:w-32">
                        <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-200 focus:border-blue-300 outline-none bg-white"
                        >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={20}>20 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="min-h-[400px] overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-blue-400">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                                onClick={() => handleSort('symbol')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Symbol</span>
                                    {getSortIcon('symbol')}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider hidden md:table-cell">
                                Company Name
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                                onClick={() => handleSort('quantity')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Qty</span>
                                    {getSortIcon('quantity')}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider cursor-pointer hover:bg-slate-100 hidden lg:table-cell"
                                onClick={() => handleSort('avgPrice')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Avg Price</span>
                                    {getSortIcon('avgPrice')}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                                onClick={() => handleSort('currentPrice')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Current Price</span>
                                    {getSortIcon('currentPrice')}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                                onClick={() => handleSort('value')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Value</span>
                                    {getSortIcon('value')}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                                onClick={() => handleSort('gainLoss')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>P&L</span>
                                    {getSortIcon('gainLoss')}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider hidden sm:table-cell">
                                Sector
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200 rounded rounded-lg">
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="px-6 py-8">
                                    <div className="min-h-[400px] flex items-center justify-center text-sm">
                                        <p className="text-center text-slate-500">
                                            No holdings found matching your criteria
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((holding, index) => (
                                <tr
                                    key={holding.symbol}
                                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100 transition-colors`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-slate-900">{holding.symbol}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 hidden md:table-cell max-w-xs truncate">
                                        {holding.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                        {holding.quantity.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 hidden lg:table-cell">
                                        {formatCurrency(holding.avgPrice)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                        {formatCurrency(holding.currentPrice)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {formatCurrency(holding.value)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`flex items-center space-x-1 ${holding.gainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'
                                            }`}>
                                            {holding.gainLoss >= 0 ?
                                                <TrendingUp className="w-4 h-4" /> :
                                                <TrendingDown className="w-4 h-4" />
                                            }
                                            <div>
                                                <div className="text-sm font-medium">
                                                    {formatCurrency(Math.abs(holding.gainLoss))}
                                                </div>
                                                <div className="text-xs">
                                                    {formatPercentage(holding.gainLossPercent)}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${holding.sector === 'Technology' ? 'bg-blue-100 text-blue-800' :
                                            holding.sector === 'Finance' ? 'bg-violet-100 text-violet-800' :
                                                holding.sector === 'Energy' ? 'bg-red-100 text-red-800' :
                                                    holding.sector === 'Banking' ? 'bg-amber-100 text-amber-800' :
                                                        holding.sector === 'Automotive' ? 'bg-green-100 text-green-800' :
                                                            holding.sector === 'Consumer Goods' ? 'bg-purple-100 text-purple-800' :
                                                                holding.sector === 'Financial Services' ? 'bg-teal-100 text-teal-800' :
                                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {holding.sector}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer with Pagination */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 mt-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Results info */}
                    <div className="text-sm text-slate-600">
                        Showing {startItem}-{endItem} of {filteredAndSortedData.length} holdings
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center space-x-2">
                            {/* Previous Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="Previous page"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {/* Page Numbers */}
                            <div className="flex items-center space-x-1">
                                {(() => {
                                    const pages = [];
                                    const showPages = 5; // Number of page buttons to show
                                    const halfShow = Math.floor(showPages / 2);

                                    let startPage = Math.max(currentPage - halfShow, 1);
                                    let endPage = Math.min(startPage + showPages - 1, totalPages);

                                    // Adjust start if we're near the end
                                    if (endPage - startPage + 1 < showPages) {
                                        startPage = Math.max(endPage - showPages + 1, 1);
                                    }

                                    // First page + ellipsis if needed
                                    if (startPage > 1) {
                                        pages.push(
                                            <button
                                                key={1}
                                                onClick={() => setCurrentPage(1)}
                                                className="px-3 py-1 text-sm rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                                            >
                                                1
                                            </button>
                                        );
                                        if (startPage > 2) {
                                            pages.push(
                                                <span key="ellipsis1" className="px-2 text-slate-400">
                                                    ...
                                                </span>
                                            );
                                        }
                                    }

                                    // Page range
                                    for (let i = startPage; i <= endPage; i++) {
                                        pages.push(
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i)}
                                                className={`px-3 py-1 text-sm rounded-lg border transition-colors ${i === currentPage
                                                    ? 'bg-blue-500 text-white border-blue-500'
                                                    : 'border-slate-200 hover:bg-slate-100'
                                                    }`}
                                            >
                                                {i}
                                            </button>
                                        );
                                    }

                                    // Last page + ellipsis if needed
                                    if (endPage < totalPages) {
                                        if (endPage < totalPages - 1) {
                                            pages.push(
                                                <span key="ellipsis2" className="px-2 text-slate-400">
                                                    ...
                                                </span>
                                            );
                                        }
                                        pages.push(
                                            <button
                                                key={totalPages}
                                                onClick={() => setCurrentPage(totalPages)}
                                                className="px-3 py-1 text-sm rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                                            >
                                                {totalPages}
                                            </button>
                                        );
                                    }

                                    return pages;
                                })()}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="Next page"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>


                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HoldingsTable;