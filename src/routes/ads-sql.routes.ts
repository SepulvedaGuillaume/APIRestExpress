import express from 'express';
import { getAllAdsWithSql, getAllAdsWithSqlFromBordeaux, deleteAdWithSqlIfPriceMoreThan40, updateAddWithSqlIfFirstOfSeptember, getAverageWithSqlPriceOfParisAds, postNewAdWithSql, getAveragePriceOfAdsByLocationWithSql, deleteAdWithSqlWithPriceInParameter } from '../controllers/ads-sql.controller';

const router = express.Router();

router.get('/', getAllAdsWithSql);
router.get('/bordeaux', getAllAdsWithSqlFromBordeaux);
router.delete('/40', deleteAdWithSqlIfPriceMoreThan40);
router.put('/september', updateAddWithSqlIfFirstOfSeptember);
router.get('/avg-paris', getAverageWithSqlPriceOfParisAds);
router.post('/', postNewAdWithSql);
router.get('/avg-location', getAveragePriceOfAdsByLocationWithSql);
router.delete('/:price', deleteAdWithSqlWithPriceInParameter);

export default router;