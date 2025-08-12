import holding from "../models/holding.js";
import Holding from "../models/holding.js"; 

// ------------------------------------- Portfolio Holdings Controller -------------------------------------------
// GET /api/portfolio/holdings
export const getPortfolioHoldings = async (req, res) => {
    try {
        const holdings = await Holding.find({});
        
        const formattedHoldings = holdings.map(holding => ({
            symbol: holding.symbol,
            name: holding.companyName,
            quantity: holding.quantity,
            avgPrice: holding.avgPrice,
            currentPrice: holding.currentPrice,
            sector: holding.sector,
            marketCap: holding.marketCap,
            value: holding.value,
            gainLoss: holding.gainLoss,
            gainLossPercent: holding.gainLossPercent
        }));

        res.status(200).json(formattedHoldings);
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching portfolio holdings", 
            error: error.message 
        });
    }
};

//------------------------------------  Portfolio Allocation ---------------------------------------- 
// GET /api/portfolio/allocation
export const getPortfolioAllocation = async (req, res) => {
    try {
        const holdings = await Holding.find({});
        
        // Calculate total portfolio value
        const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
        
        // Group by sector
        const sectorAllocation = {};
        holdings.forEach(holding => {
            if (!sectorAllocation[holding.sector]) {
                sectorAllocation[holding.sector] = { value: 0 };
            }
            sectorAllocation[holding.sector].value += holding.value;
        });
        
        // Calculate sector percentages
        Object.keys(sectorAllocation).forEach(sector => {
            sectorAllocation[sector].percentage = parseFloat(
                ((sectorAllocation[sector].value / totalValue) * 100).toFixed(1)
            );
        });
        
        // Group by market cap
        const marketCapAllocation = {};
        holdings.forEach(holding => {
            if (!marketCapAllocation[holding.marketCap]) {
                marketCapAllocation[holding.marketCap] = { value: 0 };
            }
            marketCapAllocation[holding.marketCap].value += holding.value;
        });
        
        // Calculate market cap percentages
        Object.keys(marketCapAllocation).forEach(cap => {
            marketCapAllocation[cap].percentage = parseFloat(
                ((marketCapAllocation[cap].value / totalValue) * 100).toFixed(1)
            );
        });
        
        const allocation = {
            bySector: sectorAllocation,
            byMarketCap: marketCapAllocation
        };

        res.status(200).json(allocation);
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching portfolio allocation", 
            error: error.message 
        });
    }
};

// -------------------------------------   Portfolio Summary  -------------------------------------------
// GET /api/portfolio/summary
export const getPortfolioSummary = async (req, res) => {
    try {
        const holdings = await Holding.find({});
        
        if (holdings.length === 0) {
            return res.status(200).json({
                totalValue: 0,
                totalInvested: 0,
                totalGainLoss: 0,
                totalGainLossPercent: 0,
                topPerformer: null,
                worstPerformer: null,
                diversificationScore: 0,
                riskLevel: "Low"
            });
        }
        
        // Calculate totals
        const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
        const totalInvested = holdings.reduce((sum, holding) => sum + (holding.avgPrice * holding.quantity), 0);
        const totalGainLoss = holdings.reduce((sum, holding) => sum + holding.gainLoss, 0);
        const totalGainLossPercent = parseFloat(((totalGainLoss / totalInvested) * 100).toFixed(2));
        
        // Find top and worst performers
        const sortedByPerformance = [...holdings].sort((a, b) => b.gainLossPercent - a.gainLossPercent);
        const topPerformer = {
            symbol: sortedByPerformance[0].symbol,
            name: sortedByPerformance[0].companyName,
            gainPercent: sortedByPerformance[0].gainLossPercent
        };
        const worstPerformer = {
            symbol: sortedByPerformance[sortedByPerformance.length - 1].symbol,
            name: sortedByPerformance[sortedByPerformance.length - 1].companyName,
            gainPercent: sortedByPerformance[sortedByPerformance.length - 1].gainLossPercent
        };
        
        // Calculate diversification score (simple algorithm based on sector distribution)
        const sectors = [...new Set(holdings.map(h => h.sector))];
        const sectorCount = sectors.length;
        const maxSectorWeight = Math.max(...sectors.map(sector => {
            const sectorValue = holdings
                .filter(h => h.sector === sector)
                .reduce((sum, h) => sum + h.value, 0);
            return (sectorValue / totalValue) * 100;
        }));
        
        // Diversification score: higher score for more sectors and balanced allocation
        let diversificationScore = Math.min(sectorCount * 2, 10);
        if (maxSectorWeight > 50) diversificationScore -= 2;
        if (maxSectorWeight > 70) diversificationScore -= 2;
        diversificationScore = Math.max(diversificationScore, 1);
        diversificationScore = parseFloat(diversificationScore.toFixed(1));
        
        // Determine risk level based on market cap allocation and sector concentration
        const largeCapPercent = holdings
            .filter(h => h.marketCap === "Large")
            .reduce((sum, h) => sum + h.value, 0) / totalValue * 100;
        
        let riskLevel = "Low";
        if (largeCapPercent < 60 || maxSectorWeight > 60) riskLevel = "Moderate";
        if (largeCapPercent < 40 || maxSectorWeight > 80) riskLevel = "High";
        
        const summary = {
            holdings: holdings.length,
            totalValue,
            totalInvested,
            totalGainLoss,
            totalGainLossPercent,
            topPerformer,
            worstPerformer,
            diversificationScore,
            riskLevel
        };

        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching portfolio summary", 
            error: error.message 
        });
    }
};