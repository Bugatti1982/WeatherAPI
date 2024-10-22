import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
//GET /API/Weather/Bismarck
router.get('/:city', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const cityName = req.params.city
    const weather = await WeatherService(cityName)
     res.status(200).json(weather)
  } catch (error) {
    res.status(500).json(error)
  }
});
  // TODO: save city to search history
// TODO: GET search history
router.get('/', async (_req: Request, res: Response) => {
  try {
    const savedStates = await HistoryService.getCities();
    res.json(savedStates);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'State id is required' });
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ success: 'State successfully removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
