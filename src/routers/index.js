import { Router } from 'express';
import productRouter from './products.js';
import authRouter from './auth.js';


const router = Router();

router.use('/product', productRouter);
router.use('/auth', authRouter);


export default router;
