"use client";

import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';


const PerformanceChart = ({ performance, loading }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('1year');

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-xs border border-slate-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Comparison</h3>
                <div className="animate-pulse">
                    <div className="h-64 bg-slate-100 rounded"></div>
                </div>
            </div>
        );
    }

    const periods = {
        '1month': '1M',
        '3months': '3M',
        '1year': '1Y'
    };

    const getCurrentValue = (asset, period) => {
        return performance?.returns?.[asset]?.[period] || 0;
    };

    return (
        <div className="bg-white rounded-xl shadow-xs border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Performance Comparison</h3>
                <div className="flex space-x-2">
                    {Object.entries(periods).map(([period, label]) => (
                        <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${selectedPeriod === period
                                ? 'bg-blue-500 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {[
                    { name: 'Portfolio', key: 'portfolio', color: 'bg-blue-500' },
                    { name: 'Nifty 50', key: 'nifty50', color: 'bg-orange-500' },
                    { name: 'Gold', key: 'gold', color: 'bg-yellow-500' }
                ].map((asset) => {
                    const value = getCurrentValue(asset.key, selectedPeriod);
                    const isPositive = value >= 0;

                    return (
                        <div key={asset.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div className="flex items-center">
                                <div className={`w-4 h-4 rounded-full ${asset.color} mr-3`}></div>
                                <span className="font-medium text-slate-900">{asset.name}</span>
                            </div>
                            <div className="flex items-center">
                                <span className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                    {isPositive ? '+' : ''}{value}%
                                </span>
                                {isPositive ? (
                                    <TrendingUp className="w-4 h-4 text-green-600 ml-2" />
                                ) : (
                                    <TrendingDown className="w-4 h-4 text-red-600 ml-2" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Simple bar visualization */}
            <div className="mt-6">
                <div className="flex items-end space-x-4 h-32">
                    {[
                        { name: 'Portfolio', key: 'portfolio', color: '#3B82F6' },
                        { name: 'Nifty 50', key: 'nifty50', color: '#F97316' },
                        { name: 'Gold', key: 'gold', color: '#EAB308' }
                    ].map((asset) => {
                        const value = getCurrentValue(asset.key, selectedPeriod);
                        const maxValue = Math.max(
                            getCurrentValue('portfolio', selectedPeriod),
                            getCurrentValue('nifty50', selectedPeriod),
                            getCurrentValue('gold', selectedPeriod)
                        );
                        const height = Math.abs(value) / maxValue * 100;

                        return (
                            <div key={asset.key} className="flex-1 flex flex-col items-center">
                                <div
                                    className="w-full rounded-t"
                                    style={{
                                        height: `${height}px`,
                                        backgroundColor: asset.color,
                                        minHeight: '20px'
                                    }}
                                ></div>
                                <span className="text-xs text-slate-600 mt-2">{asset.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PerformanceChart;