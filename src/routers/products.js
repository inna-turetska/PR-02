import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from '../controllers/products.js';
import { createProductsSchema } from '../validation/products.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/autenticate.js';

const router = Router();

router.use(authenticate);

router.get('/products', ctrlWrapper(getProductsController));

router.get(
  '/products/:productId',
  isValidId,
  ctrlWrapper(getProductByIdController),
);

router.post(
  '/products',
  validateBody(createProductsSchema),
  ctrlWrapper(createProductController),
);

router.patch(
  '/products/:productId',
  isValidId,
  validateBody(createProductsSchema),
  ctrlWrapper(updateProductController),
);
router.delete(
  '/products/:productId',
  isValidId,
  ctrlWrapper(deleteProductController),
);

export default router;
