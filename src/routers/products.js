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

router.get('/', ctrlWrapper(getProductsController));

router.get('/:productId', isValidId, ctrlWrapper(getProductByIdController));

router.post(
  '/',
  validateBody(createProductsSchema),
  ctrlWrapper(createProductController),
);

router.patch(
  '/:productId',
  isValidId,
  validateBody(createProductsSchema),
  ctrlWrapper(updateProductController),
);
router.delete('/:productId', isValidId, ctrlWrapper(deleteProductController));

export default router;
