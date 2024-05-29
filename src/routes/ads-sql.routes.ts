import express from 'express';
import { getAllAdsWithSql, getAllAdsWithSqlFromBordeaux, deleteAdWithSqlIfPriceMoreThan40, updateAddWithSqlIfFirstOfSeptember, getAveragePriceOfParisAds, postNewAdWithSql, getAveragePriceOfAdsByLocation, deleteAdWithSqlWithPriceInParameter } from '../controllers/ads-sql.controller';

const router = express.Router();

router.get('/', getAllAdsWithSql);
router.get('/bordeaux', getAllAdsWithSqlFromBordeaux);
router.delete('/40', deleteAdWithSqlIfPriceMoreThan40);
router.put('/september', updateAddWithSqlIfFirstOfSeptember);
router.get('/avg-paris', getAveragePriceOfParisAds);
router.post('/', postNewAdWithSql);
router.get('/avg-location', getAveragePriceOfAdsByLocation);
router.delete('/:price', deleteAdWithSqlWithPriceInParameter);

export default router;