
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart } from 'lucide-react';

// Overview Cards Component
const OverviewCards = ({ summary, loading }) => {
    const cards = [
        {
            title: 'Total Portfolio Value',
            value: summary?.totalValue ? `₹${summary.totalValue.toLocaleString('en-IN')}` : '₹0',
            icon: <DollarSign className="w-6 h-6" />,
            color: 'bg-blue-50 text-blue-600'
        },
        {
            title: 'Total Gain/Loss',
            value: summary?.totalGainLoss ? `₹${summary.totalGainLoss.toLocaleString('en-IN')}` : '₹0',
            icon: summary?.totalGainLoss >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />,
            color: summary?.totalGainLoss >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        },
        {
            title: 'Portfolio Performance',
            value: summary?.totalGainLossPercent ? `${summary.totalGainLossPercent}%` : '0%',
            icon: <BarChart3 className="w-6 h-6" />,
            color: summary?.totalGainLossPercent >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        },
        {
            title: 'Number of Holdings',
            value: summary?.holdings || 0,
            icon: <PieChart className="w-6 h-6" />,
            color: 'bg-purple-50 text-purple-600'
        }
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 animate-pulse">
                        <div className="h-4 bg-slate-100 rounded w-3/4 mb-4"></div>
                        <div className="h-8 bg-slate-100 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, index) => (
                <div key={index} className="bg-white rounded-xl shadow-xs border border-slate-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600 mb-2">{card.title}</p>
                            <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${card.color}`}>
                            {card.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OverviewCards;