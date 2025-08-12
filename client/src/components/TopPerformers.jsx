import { TrendingUp, TrendingDown, Target } from 'lucide-react';


const TopPerformers = ({ summary, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl shadow-xs border border-slate-100 p-6 animate-pulse">
                        <div className="h-4 bg-slate-100 rounded w-3/4 mb-4"></div>
                        <div className="h-6 bg-slate-100 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Best Performer */}
            <div className="bg-white rounded-xl shadow-xs border border-slate-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Best Performer</h3>
                    <div className="p-2 bg-green-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                </div>
                {summary?.topPerformer && (
                    <div>
                        <p className="text-xl font-bold text-slate-900">{summary.topPerformer.symbol}</p>
                        <p className="text-sm text-slate-600 mb-2">{summary.topPerformer.name}</p>
                        <p className="text-lg font-semibold text-green-600">
                            +{(summary.topPerformer.gainPercent * 100).toFixed(2)}%
                        </p>
                    </div>
                )}
            </div>

            {/* Worst Performer */}
            <div className="bg-white rounded-xl shadow-xs border border-slate-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Worst Performer</h3>
                    <div className="p-2 bg-red-50 rounded-lg">
                        <TrendingDown className="w-5 h-5 text-red-600" />
                    </div>
                </div>
                {summary?.worstPerformer && (
                    <div>
                        <p className="text-xl font-bold text-slate-900">{summary.worstPerformer.symbol}</p>
                        <p className="text-sm text-slate-600 mb-2">{summary.worstPerformer.name}</p>
                        <p className="text-lg font-semibold text-red-600">
                            {(summary.worstPerformer.gainPercent * 100).toFixed(2)}%
                        </p>
                    </div>
                )}
            </div>

            {/* Portfolio Insights */}
            <div className="bg-white rounded-xl shadow-xs border border-slate-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Portfolio Insights</h3>
                    <div className="p-2 bg-purple-50 rounded-lg">
                        <Target className="w-5 h-5 text-purple-600" />
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-600">Diversification Score</span>
                        <span className="font-semibold text-slate-900">
                            {summary?.diversificationScore || 0}/10
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-600">Risk Level</span>
                        <span className={`font-semibold px-2 py-1 rounded text-xs ${summary?.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                            summary?.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                            {summary?.riskLevel || 'Unknown'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default TopPerformers;