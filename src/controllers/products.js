import createHttpError from 'http-errors';
import {
  getALLProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/products.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getProductsController = async (req, res) => {
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const products = await getALLProducts({
    userId: req.user._id,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};
export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const product = await getProductById({ productId, userId });
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const userId = req.user._id;
  const product = await createProduct({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

export const updateProductController = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const data = await updateProduct(productId, userId, req.body);

  if (!data.contact) {
    throw createHttpError(404, 'Product not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a product!',
    data: data.contact,
  });
};

export const deleteProductController = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const product = await deleteProduct(productId, userId);

  if (!product) {
    next(createHttpError(404, 'Product not found'));
    return;
  }
  res.status(204).send();
};
