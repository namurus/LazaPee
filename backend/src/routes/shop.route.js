import { Router } from 'express';
import {
    setTemporaryClosure,
    clearTemporaryClosure,
		openShop,
		getShopDetails,
		updateShop,
		getShopProducts
} from '../controllers/shop.controller';
import authentication from '@/middlewares/authentication';


import multer from 'multer';
import uploadCloud from '@/middlewares/uploadCloud';
import isSeller from '@/middlewares/isSeller';

const upload = multer();

const router = Router();

router.post('/:shopId/temporary-closure', authentication, setTemporaryClosure);

router.delete('/:shopId/temporary-closure', authentication, clearTemporaryClosure);

router.post('/open-shop', authentication, upload.single('background'), uploadCloud, openShop);
router.get("/detail", isSeller, getShopDetails);
router.patch("/update", isSeller, upload.single('background'), uploadCloud, updateShop);
router.get('/product', isSeller, getShopProducts);

export default router;
