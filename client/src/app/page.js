"use client"

import { useState, useEffect } from 'react';
import OverviewCards from '@/components/OverviewCard';
import AssetAllocation from '@/components/AssetAllocation';
import PerformanceChart from '@/components/PerformanceChart';
import TopPerformers from '@/components/TopPerformers';

const PortfolioDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [allocation, setAllocation] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [summaryRes, allocationRes, performanceRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/summary`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/allocation`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/performance`)
        ]);

        if (!summaryRes.ok || !allocationRes.ok || !performanceRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [summaryData, allocationData, performanceData] = await Promise.all([
          summaryRes.json(),
          allocationRes.json(),
          performanceRes.json()
        ]);

        setSummary(summaryData);
        setAllocation(allocationData);
        setPerformance(performanceData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Portfolio</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  mt-6">
      <div className=" max-w-7xl mx-auto px-3 xl:px-0 lg:px-8 sm:px-6 ">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
        <p className="text-slate-500 mb-6">Welcome to your portfolio dashboard</p>
        {/* Overview Cards */}
        <OverviewCards summary={summary} loading={loading} />

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AssetAllocation allocation={allocation} loading={loading} />
          <PerformanceChart performance={performance} loading={loading} />
        </div>

        {/* Top Performers */}
        <TopPerformers summary={summary} loading={loading} />
      </div>
    </div>
  );
};

export default PortfolioDashboard;