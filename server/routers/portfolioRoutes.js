import express from 'express';
import { getPortfolioHoldings , getPortfolioAllocation ,getPortfolioSummary } from '../controllers/portfolioController.js'; 
const router = express.Router();

router.get('/holdings', getPortfolioHoldings);
router.get('/allocation', getPortfolioAllocation);  
router.get('/summary', getPortfolioSummary);

export default router;