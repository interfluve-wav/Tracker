import { Router } from 'express';
import trackerService from '../services/tracker.js';

const router = Router();

router.post('/cigarette', async (req, res) => {
  try {
    const result = await trackerService.addCigarette();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to log cigarette' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = await trackerService.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

export default router;