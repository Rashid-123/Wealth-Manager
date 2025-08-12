
import fs from 'fs';


export const getPerformance = (req, res) => {
  try {
    // Read JSON file
    const rawData = fs.readFileSync('performance.json');
    const data = JSON.parse(rawData);
    console.log("Data loaded successfully:", data);

    const timeline = data.Timeline;
    if (!timeline || timeline.length === 0) {
      return res.status(400).json({ error: "Timeline data is empty" });
    }

    // Helper to calculate percentage change
    const calcReturn = (current, past) => {
      return parseFloat((((current - past) / past) * 100).toFixed(2));
    };

    const latest = timeline[timeline.length - 1];

    // 1 month ago
    const oneMonthAgo = timeline[timeline.length - 2];

    // 3 months ago
    const threeMonthsAgo = timeline[timeline.length - 4];

    // 1 year ago (assuming monthly data and 12 entries back)
    const oneYearAgo = timeline[0];

    const returns = {
      portfolio: {
        "1month": calcReturn(latest.portfolio, oneMonthAgo.portfolio),
        "3months": calcReturn(latest.portfolio, threeMonthsAgo.portfolio),
        "1year": calcReturn(latest.portfolio, oneYearAgo.portfolio),
      },
      nifty50: {
        "1month": calcReturn(latest.nifty50, oneMonthAgo.nifty50),
        "3months": calcReturn(latest.nifty50, threeMonthsAgo.nifty50),
        "1year": calcReturn(latest.nifty50, oneYearAgo.nifty50),
      },
      gold: {
        "1month": calcReturn(latest.gold, oneMonthAgo.gold),
        "3months": calcReturn(latest.gold, threeMonthsAgo.gold),
        "1year": calcReturn(latest.gold, oneYearAgo.gold),
      }
    };

    res.json({ returns });

  } catch (error) {
    console.error("Error calculating returns:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
