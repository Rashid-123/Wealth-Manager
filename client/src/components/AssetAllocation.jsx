
"use client";
import { useState } from 'react';

const AssetAllocation = ({ allocation, loading }) => {
    const [hoveredSector, setHoveredSector] = useState(null);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-xs border border-slate-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
                <div className="animate-pulse">
                    <div className="h-64 bg-slate-100 rounded mb-4"></div>
                    <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-4 bg-slate-100 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const sectors = allocation?.bySector ? Object.entries(allocation.bySector) : [];
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316', '#EC4899'];


    const createDonutChart = () => {
        const size = 200;
        const strokeWidth = 30;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;

        let currentAngle = 0;

        return sectors.map(([sector, data], index) => {
            const percentage = data.percentage;
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -currentAngle * circumference / 100;

            currentAngle += percentage;

            return (
                <circle
                    key={sector}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={colors[index % colors.length]}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="hover:opacity-80 cursor-pointer transition-opacity"
                    onMouseEnter={() => setHoveredSector(sector)}
                    onMouseLeave={() => setHoveredSector(null)}
                />
            );
        });
    };


    const hoveredSectorData = hoveredSector ? allocation.bySector[hoveredSector] : null;

    return (
        <div className="bg-white rounded-xl shadow-xs border border-slate-100 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Asset Allocation</h3>

            {/* Sector Distribution */}
            <div className="mb-6">
                <h3 className="text-md font-medium text-slate-800 mb-3">Sector Distribution</h3>
                <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                        <svg width="200" height="200" className="transform -rotate-90">
                            {createDonutChart()}
                        </svg>

                        {/* Tooltip for hovered sector */}
                        {hoveredSector && hoveredSectorData && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-white rounded-lg shadow-lg border border-gray-200  text-center">
                                    <div className="text-sm font-semibold text-slate-800">{hoveredSector}</div>
                                    <div className="text-lg font-bold text-slate-900">{hoveredSectorData.percentage}%</div>
                                    <div className="text-xs text-slate-600">₹{hoveredSectorData.value.toLocaleString('en-IN')}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="ml-5 space-y-1.5">
                        {sectors.map(([sector, data], index) => (
                            <div
                                key={sector}
                                className={`flex items-center py-1 px-2 rounded transition-colors ${hoveredSector === sector ? 'bg-slate-50' : ''
                                    }`}
                            >
                                <div
                                    className="w-2.5 h-2.5 rounded-full mr-2 flex-shrink-0"
                                    style={{ backgroundColor: colors[index % colors.length] }}
                                ></div>
                                <span className="text-xs font-medium text-slate-700">{sector}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-md font-medium text-slate-800 mb-3">Market Cap Distribution</h3>
                {allocation?.byMarketCap && (
                    <div className="space-y-2">
                        {Object.entries(allocation.byMarketCap).map(([cap, data]) => (
                            <div key={cap} className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">{cap} Cap</span>
                                <div className="flex items-center">
                                    <div className="w-32 bg-slate-200 rounded-full h-2 mr-3">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${data.percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-900 w-12">{data.percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssetAllocation;