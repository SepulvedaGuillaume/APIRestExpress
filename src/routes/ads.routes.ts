import express from 'express';
import { getAllAds, postAd, deleteAd, updateAd } from '../controllers/ads.controller';

const router = express.Router();

router.get('/', getAllAds);
router.post('/', postAd);
router.delete('/:id', deleteAd);
router.put('/:id', updateAd);

export default router;